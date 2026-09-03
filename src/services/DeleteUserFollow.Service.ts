import {
    FETCH_USER_FOLLOWING_URL,
    FORBIDDEN_MSG,
    UNAUTHORIZED_ACCESS_MSG,
} from '@constant';

export const deleteUserFollow = async (
    username: string | undefined,
    token: string | null,
) => {
    const fetchURL = FETCH_USER_FOLLOWING_URL + username;

    const response = await fetch(fetchURL, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 204) {
        return true;
    } else if (response.status === 404) {
        return false;
    } else if (response.status === 401) {
        throw new Error(UNAUTHORIZED_ACCESS_MSG);
    } else if (response.status === 403) {
        throw new Error(FORBIDDEN_MSG);
    } else {
        throw new Error(await response.text());
    }
};
