import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { localStoragePAT, localStorageUsername } from '@constant';
import { login, logout } from '@features/userSlice';
import { AppDispatch } from '@store/store';

import { getUser } from './userService';

export const SessionRefresh = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const restoreSession = async () => {
            const username = localStorage.getItem(localStorageUsername);
            const password = localStorage.getItem(localStoragePAT);

            if (!username || !password) return;

            try {
                const user = await getUser(password, username);

                dispatch(
                    login({
                        user,
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
