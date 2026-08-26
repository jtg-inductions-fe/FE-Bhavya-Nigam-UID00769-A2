import { FETCH_GET_USERS_LIST_URL } from '@constant';
import { UserSearch } from '@type/userSearch';
import { UserSearchResult } from '@type/userSearchResult';

export const getUserLists = async (
    token: string | null,
    username: string,
): Promise<UserSearchResult[]> => {
    let userLists;
    if (token) {
        userLists = await fetch(FETCH_GET_USERS_LIST_URL + username, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        userLists = await fetch(FETCH_GET_USERS_LIST_URL + username);
    }

    if (!userLists.ok) {
        throw new Error('Failed to search users');
    }

    const data = (await userLists.json()) as UserSearch;

    return data.items;
};
