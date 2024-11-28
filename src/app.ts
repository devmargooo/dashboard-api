import express, { Express, NextFunction, Request, Response} from 'express';
import { Server } from 'http';
import { ILogger } from './logger/logger.interface';
import { UserController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import { injectable, inject } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';
import { IUsersController } from './users/users.interface';

@injectable() 
export class App {
    app: Express;
    port: number;
    server: Server;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.IUsersController) private userController: IUsersController,
        @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter
    ) {
        this.app = express(); 
        this.port = 8001;
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
        this.server = this.app.listen(this.port, () => {
            this.logger.log("Server started")
        })
    }

    useExeptionFilters() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
    } 

    public async init() {
        this.useRoutes();
        this.useExeptionFilters();
    }
}