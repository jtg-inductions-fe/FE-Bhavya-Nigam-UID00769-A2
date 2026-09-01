import { useEffect, useState } from 'react';

import { SEARCH_USER_ERROR } from '@constant';
import { getUserLists } from '@services/GetUsersList.Service';
import { useAppSelector } from '@store/store';
import { UserSearchResult } from '@type/userSearchResult';

export const useSearchUser = (username: string) => {
    const storedData = useAppSelector((state) => state.user);
    const pat = storedData.pat;
    const [usernameError, setUsernameError] = useState('');
    const [usersList, setUsersList] = useState<UserSearchResult[]>([]);
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const timer = setTimeout(() => {
            setUsernameError('');
            if (!username.trim()) {
                setUsersList([]);
                return;
            }
            const searchUsers = async () => {
                try {
                    const data = await getUserLists(
                        pat,
                        username.trim(),
                        signal,
                    );
                    setUsersList(data);
                } catch (e) {
                    setUsernameError(
                        e instanceof Error ? e.message : SEARCH_USER_ERROR,
                    );
                }
            };

            void searchUsers();

            return () => {
                controller.abort();
            };
        }, 500);

        return () => clearTimeout(timer);
    }, [username, pat]);

    return { usernameError, usersList };
};
