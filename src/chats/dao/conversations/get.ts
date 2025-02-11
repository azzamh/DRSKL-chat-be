import * as schema from '@db/schema';
import { db } from "@src/db";
import { eq } from "drizzle-orm";

export const getConversationById = async (conversationId: number) => {
    try {
        const result = await db
          .select({
              id: schema.conversations.id,
              name: schema.conversations.name,
              is_group: schema.conversations.is_group,
          })
          .from(schema.conversations)
          .where(
              eq(schema.conversations.id, conversationId)
          );
        console.log("getConversations result", result);
        return result;
    } catch (error) {
        console.error("getConversations error", error);
        throw error;
    }
}

export const getConversationsByUserId = async (userId: number) => {
    try {
        const result = await db
            .select({
                id: schema.conversations.id,
                name: schema.conversations.name,
                is_group: schema.conversations.is_group,
            })
            .from(schema.conversations)
            .leftJoin(
                schema.usersConversations,
                eq(schema.conversations.id, schema.usersConversations.conversation_id)
            ).where(
                eq(schema.usersConversations.user_id, userId)
            );
        console.log("getConversations result", result);
        return result;
    } catch (error) {
        console.error("getConversations error", error);
        throw error;
    }
}