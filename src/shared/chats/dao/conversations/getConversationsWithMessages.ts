import * as conversationSchema from '@db/schema/chat/conversations';
import * as messageSchema from '@db/schema/chat/messages';
import { db } from "@src/db";

export const getConversationsWithMessages = async () => {
    try {
        const result = await db
            .select({
                conversationId: conversationSchema.conversations.id,
                conversationName: conversationSchema.conversations.name,
                isGroup: conversationSchema.conversations.is_group,
                messageId: messageSchema.messages.id,
                messageContent: messageSchema.messages.content,
                senderId: messageSchema.messages.sender_id,
                sentAt: messageSchema.messages.sent_at,
            })
            .from(conversationSchema.conversations)
            .leftJoin(
                messageSchema.messages,
                eq(messageSchema.messages.conversation_id, conversationSchema.conversations.id)
            );

        // Group messages by conversation
        const conversationsMap: Record<number, any> = {};
        
        result.forEach(row => {
            const conversationId = Number(row.conversationId);
            
            if (!conversationsMap[conversationId]) {
                conversationsMap[conversationId] = {
                    id: conversationId,
                    name: row.conversationName,
                    is_group: row.isGroup,
                    messages: []
                };
            }
            
            if (row.messageId) {
                conversationsMap[conversationId].messages.push({
                    id: row.messageId,
                    content: row.messageContent,
                    sender_id: row.senderId,
                    sent_at: row.sentAt,
                });
            }
        });

        return Object.values(conversationsMap);
    } catch (error) {
        console.error("getConversationsWithMessages error", error);
        throw error;
    }
}
