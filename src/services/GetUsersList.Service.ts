import { UNABLE_TO_SEARCH } from 'constant/ErrorMessages.Constant';

import { FETCH_GET_USERS_LIST_URL } from '@constant';
import { UserSearch } from '@type/userSearch';
import { UserSearchResult } from '@type/userSearchResult';

export const getUserLists = async (
    token: string | null,
    username: string,
): Promise<UserSearchResult[]> => {
    const fetchURL = FETCH_GET_USERS_LIST_URL + username;

    const userLists = await fetch(
        fetchURL,
        token
            ? {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
            : undefined,
    );

    if (!userLists.ok) {
        throw new Error(UNABLE_TO_SEARCH);
    }

    const data = (await userLists.json()) as UserSearch;

    return data.items;
};
