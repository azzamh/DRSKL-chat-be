import bcrypt from 'bcrypt'
import { NewUser } from '@db/schema/users/users';
import { insertNewUser } from '../dao/insertNewUser.dao';
import { InternalServerErrorResponse } from '@src/shared/commons/patterns';

export const registerService = async (
    username: string,
    password: string,
    full_name: string,
) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData: NewUser = {
            username,
            password: hashedPassword,
            full_name
        }
        const newUser = await insertNewUser(userData)

        return {
            data: newUser,
            status: 201
        }
    } catch (err: any) {
        return new InternalServerErrorResponse(err).generate();
    }
}