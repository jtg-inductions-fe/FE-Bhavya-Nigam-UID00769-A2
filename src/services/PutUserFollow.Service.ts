import { FETCH_USER_FOLLOWING_URL } from '@constant';

export const putUserFollow = async (
    username: string | undefined,
    token: string | null,
) => {
    const fetchUrl = FETCH_USER_FOLLOWING_URL + username;

    const response = await fetch(fetchUrl, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 204) {
        return true;
    } else if (response.status === 404) {
        return false;
    } else if (response.status === 401) {
        throw new Error('Required Authentication');
    } else if (response.status === 403) {
        throw new Error('Forbidden');
    } else {
        throw new Error(await response.text());
    }
};
