import { db } from "@src/db";
import { getPrivateConversationByUserIds } from "../dao/conversations/get";
import { insertNewMessage } from "../dao/mesages/insert";
import { InternalServerErrorResponse, OkResponse } from "@src/shared/commons/patterns";
import { startPrivateConversation } from "./startPrivateConversation";

export const sendPrivateMessage = async (sender_id: string, receiver_id: string, message: string) => {

    try {
        const result = await db.transaction(async (tx) => {
            let conversation = await getPrivateConversationByUserIds(sender_id, receiver_id);

            if (!conversation) {
                await startPrivateConversation(sender_id, receiver_id);
                conversation = await getPrivateConversationByUserIds(sender_id, receiver_id);
            }

            const newMessage = await insertNewMessage( {
                sender_id: sender_id,
                conversation_id: conversation.id,
                content: message,
            });

            return new OkResponse(newMessage).generate();
            
        });

        return result;
    } catch (err) {
        return new InternalServerErrorResponse(err).generate()
    }
}