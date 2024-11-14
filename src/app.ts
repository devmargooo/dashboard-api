import express, { Express } from 'express';
import { userRouter } from './users/users';
import { Server } from 'http';

export class App {
    app: Express;
    port: number;
    server: Server;

    constructor() {
        this.app = express(); 
        this.port = 8001;
    }

    useRoutes() {
        this.app.use('/users', userRouter);
        this.server = this.app.listen(this.port, () => {
            console.log("Server started")
        })
    }

    public async init() {
        this.useRoutes();
    }
}