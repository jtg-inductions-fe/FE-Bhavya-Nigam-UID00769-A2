import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { LOCAL_STORAGE_PAT, LOCAL_STORAGE_USERNAME } from '@constant';
import { login, logout } from '@features/userSlice';
import { AppDispatch } from '@store/store';

import { getUser } from './userService';

export const SessionRefresh = () => {
    const dispatch = useDispatch<AppDispatch>();

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
                        isLoggedIn: true,
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
