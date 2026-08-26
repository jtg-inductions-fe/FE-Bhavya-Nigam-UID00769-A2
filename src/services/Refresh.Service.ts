import { useEffect } from 'react';

import { login, logout } from '@features/User.Slice';
import { useAppDispatch } from '@store/store';
import { useAppSelector } from '@store/store';

import { getUser } from './User.Service';

export const SessionRefresh = () => {
    const dispatch = useAppDispatch();
    const storedData = useAppSelector((state) => state.user);
    const username = storedData.username;
    const password = storedData.pat;

    useEffect(() => {
        const restoreSession = async () => {
            if (!username || !password) return;

            try {
                const user = await getUser(password, username);

                dispatch(
                    login({
                        userDetails: user,
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
