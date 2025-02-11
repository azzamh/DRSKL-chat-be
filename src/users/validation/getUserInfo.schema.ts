import { z } from "zod";

export const getUserInfo = z.object({
    params: z.object({
        user_id: z.number().int(),
    })
})