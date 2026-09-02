import { Navigate, Outlet } from 'react-router';

import { LOGIN_PAGE_URL } from '@constant';
import { useAppSelector } from '@store/store';

export const ProtectedRoute = () => {
    const userDetails = useAppSelector((state) => state.user.userDetails);
    return userDetails ? <Outlet /> : <Navigate to={LOGIN_PAGE_URL} replace />;
};
