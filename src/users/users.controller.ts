import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUsersController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserService } from './users.service';
import { IUsersService } from './users.service.interface';
import { HTTPError } from '../errors/http-error.class';
import { ValidateMiddleware } from '../common/validate.middleware.interface';

@injectable()
export class UserController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) protected logger: ILogger,
		@inject(TYPES.IUserService) private userService: IUsersService,
	) {
		super(logger);
		this.bindRouter([
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
		]);
	}

	async login(
		{ body }: Request<any, any, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(body);
		if (result === null) {
			return next(new HTTPError(404, 'Пользователь не найден'));
		}
		if (result === false) {
			return next(new HTTPError(403, 'Неверный пароль'));
		}
		this.ok(res, 'Пользователь успешно авторизован');
	}

	async register(
		{ body }: Request<any, any, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует'));
		}
		this.ok(res, { email: result.email, id: result.id });
	}
}
