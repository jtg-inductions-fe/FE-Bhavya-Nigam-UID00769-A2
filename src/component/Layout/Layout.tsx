import { Outlet } from 'react-router-dom';

import { NavbarContainer } from '@container/Navbar/Navbar.Container';

export const Layout = () => (
    <div>
        <NavbarContainer />
        <Outlet />
    </div>
);
