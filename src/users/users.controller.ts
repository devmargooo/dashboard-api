import { BaseController } from '../common/base.controller';
import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUsersController } from './users.interface';

@injectable()
export class UserController extends BaseController implements IUsersController {
	constructor(@inject(TYPES.ILogger) logger: ILogger) {
		super(logger);
		this.bindRouter([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register },
		]);
	}

	login(req: Request, res: Response): void {
		this.ok(res, 'login');
	}

	register(req: Request, res: Response): void {
		this.ok(res, 'register');
	}
}
