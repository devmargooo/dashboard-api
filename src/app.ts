import express, { Express, NextFunction, Request, Response } from 'express';
import { Server } from 'http';
import { ILogger } from './logger/logger.interface';

import { injectable, inject } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';
import { IUsersController } from './users/users.controller.interface';
import { json } from 'body-parser';
import { IConfigService } from './config/config.service.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IUsersController) private userController: IUsersController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
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
