import { BaseController } from '../common/base.controller';
import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUsersController } from './users.interface';
import { UserLoginDto } from './dto/user-login.dto';

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

	register(req: Request, res: Response): void {
		this.ok(res, 'register');
	}
}
