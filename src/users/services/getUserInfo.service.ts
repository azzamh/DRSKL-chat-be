import { InternalServerErrorResponse, NotFoundResponse, OkResponse } from "@src/shared/commons/patterns"
import { getUserById } from "../dao/getUserById.dao"

export const getUserInfoService = async (
    user_id: string
) => {
    // console.log('user_id', user_id)
    try {
        const tenant = await getUserById(user_id);
        if (!tenant) {
            return new NotFoundResponse('User not found').generate()
        }

        return new OkResponse(tenant).generate()
           
    } catch (err: any) {
        return new InternalServerErrorResponse(err).generate()
    }
}