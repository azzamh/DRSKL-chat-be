import * as dao from "@src/chats/dao/mesages";


export const getMessagesByConversation = async (conversation_id: number) => {
    return await dao.getMessagesByConversationId(conversation_id);
}