import { FETCH_GET_USERS_LIST_URL } from '@constant';
import { UserSearch } from '@type/userSearch';
import { UserSearchResult } from '@type/userSearchResult';

export const getUserLists = async (
    token: string | null,
    username: string,
): Promise<UserSearchResult[]> => {
    let userLists;
    const fetchURL = FETCH_GET_USERS_LIST_URL + username;

    if (token) {
        userLists = await fetch(fetchURL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        userLists = await fetch(fetchURL);
    }

    if (!userLists.ok) {
        throw new Error('Failed to search users');
    }

    const data = (await userLists.json()) as UserSearch;

    return data.items;
};
