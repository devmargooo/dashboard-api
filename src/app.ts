import express, { Express, NextFunction, Request, Response } from 'express';
import { Server } from 'http';
import { ILogger } from './logger/logger.interface';

import { ExeptionFilter } from './errors/exeption.filter';
import { injectable, inject } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';
import { IUsersController } from './users/users.interface';
import { json } from 'body-parser';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IUsersController) private userController: IUsersController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
	) {
		this.app = express();
		this.port = 8001;
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilters();

		this.server = this.app.listen(this.port, () => {
			this.logger.log('Server started');
		});
	}
}
