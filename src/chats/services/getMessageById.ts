import * as daoMessages from "../dao/mesages";

export const getMessageById = async (conversationId: number) => {
    const result = await daoMessages.getMessageById(conversationId);
    return result;
}