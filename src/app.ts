import express, { Express } from 'express';
import { Server } from 'http';
import { ILogger } from './logger/logger.interface';
import { UserController } from './users/users.controller';

export class App {
    app: Express;
    port: number;
    server: Server;
    logger: ILogger;
    userController: UserController;

    constructor(logger: ILogger, userController: UserController) {
        this.app = express(); 
        this.port = 8001;
        this.logger = logger;
        this.userController = userController;
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
        this.server = this.app.listen(this.port, () => {
            this.logger.log("Server started")
        })
    }

    public async init() {
        this.useRoutes();
    }
}