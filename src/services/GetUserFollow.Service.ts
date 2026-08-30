import { FETCH_USER_FOLLOWING_URL } from '@constant';

export const getUserFollow = async (username: string, token: string | null) => {
    const fetchUrl = FETCH_USER_FOLLOWING_URL + username;
    let response;

    if (token) {
        response = await fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        response = await fetch(fetchUrl);
    }

    if (response.status === 204) {
        return true;
    } else if (response.status === 404) {
        return false;
    } else if (response.status === 401) {
        throw new Error('Required Authentication');
    } else if (response.status === 403) {
        throw new Error('Forbidden');
    }
};
