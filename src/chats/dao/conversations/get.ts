import * as schema from '@db/schema';
import { db } from "@src/db";
import { OkResponse } from '@src/shared/commons/patterns';
import { ok } from 'assert';
import { eq, or, and, ne, sql } from "drizzle-orm";

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
          ).execute();
        return result;
    } catch (error) {
        console.error("getConversationById error", error);
        throw error;
    }
}

export const getConversationsByUserId = async (userId: number) => {
    try {
        const result = await db.execute(sql `
            SELECT 
                c.id,
                CASE 
                    WHEN c.is_group THEN c.name 
                    ELSE u.username 
                END as name,
                c.is_group
            FROM conversations c
            LEFT JOIN users_conversations uc ON c.id = uc.conversation_id
            LEFT JOIN users u ON u.id = uc.user_id
            WHERE uc.user_id != ${userId.toString()} 
            ` );

        return result.rows;
    } catch (error) {
        console.error("getConversationsByUserId error", error);
        throw error;
    }
}

export const getPrivateConversationByUserIds = async (userId: string, peerUserId: string) => {
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
                or(
                    eq(schema.usersConversations.user_id, userId),
                    eq(schema.usersConversations.user_id, peerUserId)
                )
            ).execute();
        return result[0];

    } catch (error) {
        console.error("getPrivateConversationByUserIds error", error);
        throw error;
    }
}
