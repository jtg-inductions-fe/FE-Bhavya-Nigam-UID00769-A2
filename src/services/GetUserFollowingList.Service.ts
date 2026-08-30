import { FETCH_GET_USER_URL } from '@constant';
import { UserFollow } from '@type/userFollow.Types';

export const getUserFollowingList = async (
    username: string | undefined,
    token: string | null,
): Promise<UserFollow[]> => {
    let res;
    const fetchURL = FETCH_GET_USER_URL + username + '/following';

    if (token) {
        res = await fetch(fetchURL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        res = await fetch(fetchURL);
    }

    const data = (await res.json()) as UserFollow[];

    return data;
};
