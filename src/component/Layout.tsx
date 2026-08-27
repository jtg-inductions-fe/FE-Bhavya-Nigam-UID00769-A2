import { Outlet } from 'react-router-dom';

import { Navbar } from '@container/Navbar/Navbar.Container';

export const Layout = () => (
    <div>
        <Navbar />
        <Outlet />
    </div>
);
