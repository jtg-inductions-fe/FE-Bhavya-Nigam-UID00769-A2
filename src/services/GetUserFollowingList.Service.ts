import { FETCH_GET_USER_URL } from '@constant';
import { UserFollow } from '@type/UserFollow.types';

export const getUserFollowingList = async (
    username: string | undefined,
    token: string | null,
): Promise<UserFollow[]> => {
    const fetchURL = FETCH_GET_USER_URL + username + '/following';

    const res = await fetch(
        fetchURL,
        token
            ? {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
            : undefined,
    );

    const data = (await res.json()) as UserFollow[];

    return data;
};
