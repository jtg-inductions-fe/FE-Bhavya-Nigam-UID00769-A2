import { Navigate, Outlet } from 'react-router';

import { LOGIN_PAGE_URL } from '@constant';
import { useAppSelector } from '@store/store';

export const ProtectedRoute = () => {
    const userData = useAppSelector((state) => state.user);
    return userData.pat ? <Outlet /> : <Navigate to={LOGIN_PAGE_URL} replace />;
};
