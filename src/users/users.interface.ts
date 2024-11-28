import { Request, Response, Router } from "express";

export interface IUsersController {
    router: Router;
    login(req: Request, res: Response): void;
    register(req: Request, res: Response): void;
}