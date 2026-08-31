import { FETCH_GET_USER_URL, USER_NOT_FOUND } from '@constant';
import { UserDetail } from '@type/userdetails.Types';

export const getUser = async (
    username: string,
    token: string | null,
): Promise<UserDetail> => {
    const fetchURL = FETCH_GET_USER_URL + username;

    const response = await fetch(
        fetchURL,
        token
            ? {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
            : undefined,
    );

    if (response.status === 404) {
        throw new Error(USER_NOT_FOUND);
    } else if (!response.ok) {
        throw new Error(await response.text());
    }

    const data = (await response.json()) as UserDetail;

    return data;
};
