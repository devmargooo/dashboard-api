import { NextFunction, Response, Request } from 'express';
import { IMiddleware } from './middleware.interface';
import { IUserRequest } from '../users/types';

export class AuthGuard implements IMiddleware {
	constructor() {}
	execute(req: IUserRequest, res: Response, next: NextFunction): Promise<void> {
		if (req.user) {
			return Promise.resolve(next());
		}
		res.status(401).send({ error: 'Вы не авторизованы' });
		return Promise.resolve();
	}
}
