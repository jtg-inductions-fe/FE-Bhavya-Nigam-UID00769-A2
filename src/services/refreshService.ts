import { useEffect } from 'react';

import { LOCAL_STORAGE_PAT, LOCAL_STORAGE_USERNAME } from '@constant';
import { login, logout } from '@features/userSlice';
import { useAppDispatch } from '@store/store';

import { getUser } from './userService';

export const SessionRefresh = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const restoreSession = async () => {
            const username = localStorage.getItem(LOCAL_STORAGE_USERNAME);
            const password = localStorage.getItem(LOCAL_STORAGE_PAT);

            if (!username || !password) return;

            try {
                const user = await getUser(password, username);

                dispatch(
                    login({
                        user: user,
                        username: username,
                        pat: password,
                    }),
                );
            } catch (e) {
                dispatch(logout());

                alert(e);
            }
        };

        void restoreSession();
    }, [dispatch]);

    return null;
};
