import express, { Express, NextFunction, Request, Response} from 'express';
import { Server } from 'http';
import { ILogger } from './logger/logger.interface';
import { UserController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';

export class App {
    app: Express;
    port: number;
    server: Server;
    logger: ILogger;
    userController: UserController;
    exeptionFilter: ExeptionFilter;

    constructor(logger: ILogger, userController: UserController, exeptionFilter: ExeptionFilter) {
        this.app = express(); 
        this.port = 8001;
        this.logger = logger;
        this.userController = userController;
        this.exeptionFilter = exeptionFilter;
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