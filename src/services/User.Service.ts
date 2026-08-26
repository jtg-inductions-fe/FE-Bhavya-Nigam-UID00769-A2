import {
    FETCH_AUTH_USER_URL,
    FORBIDDEN_MSG,
    UNAUTHORIZED_ACCESS_MSG,
} from '@constant';
import { UserDetail } from '@type/userdetails.Types';

export const getUser = async (
    token: string,
    username: string,
): Promise<UserDetail> => {
    const authUser = await fetch(FETCH_AUTH_USER_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (authUser.status === 401) {
        throw new Error(UNAUTHORIZED_ACCESS_MSG);
    }

    if (authUser.status === 403) {
        throw new Error(FORBIDDEN_MSG);
    }

    const data = (await authUser.json()) as UserDetail;

    if (data.login !== username) {
        throw new Error(UNAUTHORIZED_ACCESS_MSG);
    }

    return data;
};
