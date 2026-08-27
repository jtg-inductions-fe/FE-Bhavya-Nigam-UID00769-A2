import { FETCH_GET_USER_URL } from '@constant';
import { UserDetail } from '@type/userdetails.Types';

export const getUser = async (
    username: string,
    token: string | null,
): Promise<UserDetail> => {
    let response;
    const fetchURL = FETCH_GET_USER_URL + username;

    if (token) {
        response = await fetch(fetchURL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        response = await fetch(fetchURL);
    }

    if (response.status === 404) {
        throw new Error('User not found');
    } else if (!response.ok) {
        throw new Error(await response.text());
    }

    const data = (await response.json()) as UserDetail;

    return data;
};
