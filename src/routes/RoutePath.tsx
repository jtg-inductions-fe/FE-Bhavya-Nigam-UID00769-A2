import { Layout } from 'component/Layout';
import { Route, Routes } from 'react-router-dom';

import { Login } from '@pages/Login';
import { Profile } from '@pages/Profile';
import { Search } from '@pages/Search';

export const RoutePath = () => (
    <Routes>
        <Route element={<Layout />}>
            {['/', 'search'].map((path, index) => (
                <Route path={path} key={index} element={<Search />} />
            ))}
            <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
    </Routes>
);
