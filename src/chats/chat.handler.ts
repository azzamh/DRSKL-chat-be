import { Request, Response } from "express";
import * as Service from "./services";

// export const sendMessagesHandler = async (req: Request, res: Response) => {
//     const { username, password } = req.body;
//     const response = await Service.sendMessage()
//     return res.status(response.status).json(response.data);
// }

export const startPrivateConversation = async (req: Request, res: Response): Promise<void> => {
    const { peer_username } = req.body;
    const user_id = req.body.user.id;
    const response = await Service.startPrivateConversation(user_id, peer_username);
    res.status(response.status).json(response);
}

export const getConversationsList = async (req: Request, res: Response): Promise<void> => {
    const user_id = req.body.user.id;
    const response = await Service.getConversationsByUserId(user_id);
    res.status(response.status).json(response);
}

export const getMessagesByConversation = async (req: Request, res: Response): Promise<void> => {
    const { conversation_id } = req.params;
    const response = await Service.getMessagesByConversation(conversation_id);
    res.status(response.status).json(response);
}
