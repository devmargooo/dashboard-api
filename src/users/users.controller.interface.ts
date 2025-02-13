import { Response, Router, NextFunction } from 'express';
import { IUserRequest } from './types';

export interface IUsersController {
	router: Router;
	login(req: IUserRequest, res: Response, next: NextFunction): Promise<void>;
	register(req: IUserRequest, res: Response, next: NextFunction): Promise<void>;
	info(req: IUserRequest, res: Response, next: NextFunction): Promise<void>;
}
