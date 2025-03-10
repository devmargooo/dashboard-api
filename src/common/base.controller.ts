import { ILogger } from '../logger/logger.interface';
import { Router, Response } from 'express';
import { IControllerRoute } from './route.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(protected logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public created(res: Response): Response {
		return res.sendStatus(201);
	}

	public send<T>(res: Response, code: number, message: T): Response {
		res.type('application/json');
		return res.status(200).json(message);
	}

	public ok<T>(res: Response, message: T): void {
		this.send<T>(res, 200, message);
	}

	protected bindRouter(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.func.bind(this);
			const pipeline = middleware ? [...middleware, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}
