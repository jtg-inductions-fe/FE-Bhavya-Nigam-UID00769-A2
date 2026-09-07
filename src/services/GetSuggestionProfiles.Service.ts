import { FETCH_SUGGESTIONS_USERS_LIST } from '@constant';
import { UserDetail } from '@type/UserDetails.types';

export const getSuggestionProfiles = async (
    token: string | null,
): Promise<UserDetail[]> => {
    const randomTime = Math.floor(Math.random() * 1000);

    const response = await fetch(
        `${FETCH_SUGGESTIONS_USERS_LIST}?since=${randomTime}`,
        token
            ? {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
            : undefined,
    );

    if (!response.ok) {
        throw new Error('Unable to fetch suggested users');
    }

    const data = (await response.json()) as UserDetail[];

    return data;
};
