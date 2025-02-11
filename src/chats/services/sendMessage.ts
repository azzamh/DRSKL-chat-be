import { db } from "@src/db";
import { insertNewConversations } from "../dao/conversations/insert";
import { insertNewMessage } from "../dao/mesages/insert";
import { NewConversations } from "@db/schema/chat/conversations";
import { NewMessage } from "@db/schema/chat/messages";
import { insertUserConversations } from "../dao/userConversations/insert";

export const sendMessage = async (conversationData: NewConversations, messageData: NewMessage) => {
    try {
        const result = await db.transaction(async (tx) => {
            const newConversation = await insertNewConversations(conversationData);
            messageData.conversation_id = newConversation[0].id; // Assuming the conversation ID is returned
            const newMessage = await insertNewMessage(messageData);

            await insertUserConversations({
                user_id: messageData.sender_id,
                conversation_id: newConversation[0].id,
            });

            return { newConversation, newMessage };
        });

        return result;
    } catch (error) {
        console.error("Transaction error", error);
        throw error;
    }
}
