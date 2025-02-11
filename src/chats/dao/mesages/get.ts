import { NewMessage } from "@db/schema/chat/messages";
import * as schema from '@db/schema/chat/messages';
import { db } from "@src/db";
import { eq } from "drizzle-orm";

export const getMessagesByConversationId = async (conversationId: number) => {
  const result = await db
      .select()
      .from(schema.messages)
      .where(
          eq(schema.messages.conversation_id, conversationId)
      )
  return result;
}

export const getMessageById = async (messageId: number) => {
  const result = await db
      .select()
      .from(schema.messages)
      .where(
          eq(schema.messages.id, messageId)
      )
  return result[0];
}

