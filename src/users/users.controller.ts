import { BaseController } from '../common/base.controller';
import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUsersController } from './users.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';

@injectable()
export class UserController extends BaseController implements IUsersController {
	constructor(@inject(TYPES.ILogger) logger: ILogger) {
		super(logger);
		this.bindRouter([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register },
		]);
	}

	login(req: Request<any, any, UserLoginDto>, res: Response): void {
		console.log(req.body);
		this.ok(res, 'login');
	}

	async register({ body }: Request<any, any, UserRegisterDto>, res: Response): Promise<void> {
		const user = new User(body.email, body.name);
		await user.setPassword(body.password);
		this.ok(res, user);
	}
}
