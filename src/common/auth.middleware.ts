import { NextFunction, Response, Request } from 'express';
import { IMiddleware } from './middleware.interface';
import { verify } from 'jsonwebtoken';
import { IUserRequest } from '../users/types';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload && typeof payload === 'object' && payload.email) {
					(req as IUserRequest).user = payload.email;
					next();
				}
			});
		} else {
			next();
		}
		return Promise.resolve();
	}
}
