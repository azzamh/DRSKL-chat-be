import { db } from "@src/db";
import { insertNewConversations } from "../dao/conversations/insert";
import { insertNewMessage } from "../dao/mesages/insert";
import { NewConversations } from "@db/schema/chat/conversations";
import { NewMessage } from "@db/schema/chat/messages";
import { insertUserConversations } from "../dao/userConversations/insert";
import { InternalServerErrorResponse } from "@src/shared/commons/patterns";

// export const sendMessage = async (conversationData: NewConversations, messageData: NewMessage) => {
//     try {
//         const result = await db.transaction(async (tx) => {
//             const newConversation = await insertNewConversations(conversationData);
//             messageData.conversation_id = newConversation[0].id; // Assuming the conversation ID is returned
//             const newMessage = await insertNewMessage(messageData);

//             await insertUserConversations({
//                 user_id: messageData.sender_id,
//                 conversation_id: newConversation[0].id,
//             });

//             // return new OkResponse(res).generate()

//             return { newConversation, newMessage };
//         });

//         return result;
//     } catch (err) {
//         return new InternalServerErrorResponse(err).generate()
//     }
// }