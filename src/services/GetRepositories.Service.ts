import {
    FETCH_GET_USER_URL,
    UNABLE_TO_FETCH_REPOSITORIES,
    USER_NOT_FOUND,
} from '@constant';
import { UserRepo } from '@type/UserRepo.types';

export const getRepositoriesByUser = async (
    username: string | undefined,
    token: string | null,
): Promise<UserRepo[]> => {
    const fetchURL = FETCH_GET_USER_URL + username + '/repos';

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

    if (res.status === 404) {
        throw new Error(USER_NOT_FOUND);
    }

    if (!res.ok) {
        throw new Error(UNABLE_TO_FETCH_REPOSITORIES);
    }

    const data = (await res.json()) as UserRepo[];

    return data;
};
