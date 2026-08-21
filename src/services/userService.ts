import { fetchAuthUser } from '@constant';
import { localStoragePAT, localStorageUsername } from '@constant';
import { UserDetail } from '@type/userdetails';

export const getUser = async (
    token: string,
    username: string,
): Promise<UserDetail> => {
    const response = await fetch(fetchAuthUser, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        throw new Error('Invalid credentials');
    }

    const data = (await response.json()) as UserDetail;

    if (data.login !== username) {
        throw new Error('Unauthorized access');
    }

    localStorage.setItem(localStorageUsername, username);
    localStorage.setItem(localStoragePAT, token);

    return data;
};
