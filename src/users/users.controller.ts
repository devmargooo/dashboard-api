import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { Request, Response } from "express";

export class UserController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
        this.bindRouter([
            { path: '/login', method: 'post', func: this.login},
            {path: '/register', method: 'post', func: this.register}
        ])
    }

    login(req: Request, res: Response) {
        this.ok(res, 'login');
    }

    register(req: Request, res: Response) {
        this.ok(res, 'register');
    }
}