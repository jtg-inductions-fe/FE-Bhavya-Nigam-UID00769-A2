import {
    FETCH_USER_FOLLOWING_URL,
    FORBIDDEN_MSG,
    UNAUTHORIZED_ACCESS_MSG,
} from '@constant';

export const getUserFollow = async (username: string, token: string | null) => {
    const fetchUrl = FETCH_USER_FOLLOWING_URL + username;

    const response = await fetch(
        fetchUrl,
        token
            ? {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
            : undefined,
    );

    if (response.status === 204) {
        return true;
    } else if (response.status === 404) {
        return false;
    } else if (response.status === 401) {
        throw new Error(UNAUTHORIZED_ACCESS_MSG);
    } else if (response.status === 403) {
        throw new Error(FORBIDDEN_MSG);
    }
};
