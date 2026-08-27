import {
    fetchAuthUserURL,
    forbiddenMsg,
    unauthorizedAccessMsg,
} from '@constant';
import { localStoragePAT, localStorageUsername } from '@constant';
import { UserDetail } from '@type/userdetails';

export const getUser = async (
    token: string,
    username: string,
): Promise<UserDetail> => {
    const authUser = await fetch(fetchAuthUserURL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (authUser.status === 401) {
        throw new Error(unauthorizedAccessMsg);
    }

    if (authUser.status === 403) {
        throw new Error(forbiddenMsg);
    }

    const data = (await authUser.json()) as UserDetail;

    if (data.login !== username) {
        throw new Error(unauthorizedAccessMsg);
    }

    localStorage.setItem(localStorageUsername, username);
    localStorage.setItem(localStoragePAT, token);

    return data;
};
