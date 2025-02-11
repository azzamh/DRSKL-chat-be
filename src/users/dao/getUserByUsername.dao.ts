import * as schema from '@db/schema/users/users'
import { db } from "@src/db";
import { eq, and } from "drizzle-orm";

export const getUserByUsername = async (username: string) => {
    const result = await db
        .select()
        .from(schema.users)
        .where(
            and(
                eq(schema.users.username, username),

            )
        )
    return result[0];
}
