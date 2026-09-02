import { Navigate } from 'react-router';

import { LOGIN_PAGE_URL } from '@constant';
import { Profile } from '@pages/Profile';
import { useAppSelector } from '@store/store';

export const ProtectedRoute = () => {
    const userDetails = useAppSelector((state) => state.user.userDetails);
    return userDetails ? <Profile /> : <Navigate to={LOGIN_PAGE_URL} />;
};
