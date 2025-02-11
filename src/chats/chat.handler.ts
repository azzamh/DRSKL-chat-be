import { Request, Response } from "express";
import * as Service from "./services";

export const sendMessagesHandler = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const response = await Service.loginService(username, password);
    return res.status(response.status).json(response.data);
}
