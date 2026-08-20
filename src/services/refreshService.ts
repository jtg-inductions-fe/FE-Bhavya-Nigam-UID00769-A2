import { useEffect } from 'react';

import { login, logout } from 'features/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/store';

import { getUser } from './authService';

export const SessionRefresh = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const restoreSession = async () => {
            const username = localStorage.getItem('user');
            const password = localStorage.getItem('pat');

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
                localStorage.removeItem('user');
                localStorage.removeItem('pat');

                dispatch(logout());

                alert(e);
            }
        };

        void restoreSession();
    }, [dispatch]);

    return null;
};
