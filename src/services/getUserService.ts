import { FETCH_GET_USER_URL } from '@constant';
import { UserDetail } from '@type/userdetails';

export const getUser = async (
    username: string,
    token: string | null,
): Promise<UserDetail> => {
    let response;
    if (!token) {
        response = await fetch(FETCH_GET_USER_URL + username);
    }

    response = await fetch(FETCH_GET_USER_URL + username, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 404) {
        throw new Error('User not found');
    } else if (!response.ok) {
        throw new Error(await response.text());
    }

    const data: UserDetail = (await response.json()) as UserDetail;

    return data;
};
