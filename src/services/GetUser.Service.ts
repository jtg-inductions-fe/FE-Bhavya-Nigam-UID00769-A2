import { FETCH_GET_USER_URL } from '@constant';
import { UserDetail } from '@type/userdetails.Types';

export const getUser = async (
    username: string,
    token: string | null,
): Promise<UserDetail> => {
    let response;
    if (token) {
        response = await fetch(FETCH_GET_USER_URL + username, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        response = await fetch(FETCH_GET_USER_URL + username);
    }

    if (response.status === 404) {
        throw new Error('User not found');
    } else if (!response.ok) {
        throw new Error(await response.text());
    }

    const data = (await response.json()) as UserDetail;

    return data;
};
