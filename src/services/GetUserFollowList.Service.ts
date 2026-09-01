import { FETCH_GET_USER_URL } from '@constant';
import { UserFollow } from '@type/userFollow.Types';

export const getUserFollowList = async (
    username: string | undefined,
    token: string | null,
): Promise<UserFollow[]> => {
    const fetchURL = FETCH_GET_USER_URL + username + '/followers';

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
