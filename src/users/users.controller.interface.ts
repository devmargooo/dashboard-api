import { Request, Response, Router, NextFunction } from 'express';

export interface IUsersController {
	router: Router;
	login(req: Request, res: Response, next: NextFunction): void;
	register(req: Request, res: Response, next: NextFunction): void;
}
