import { Route, Routes } from 'react-router-dom';

import { Login } from '@pages/Login';
import { Profile } from '@pages/Profile';
import { Search } from '@pages/Search';

export const RoutePath = () => (
    <Routes>
        {['/', 'search'].map((path, index) => (
            <Route path={path} key={index} element={<Search />} />
        ))}
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
    </Routes>
);
