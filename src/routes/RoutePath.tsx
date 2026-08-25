import { Route, Routes } from 'react-router-dom';

import { Login } from '@pages/Login';
import { Profile } from '@pages/Profile';
import { Search } from '@pages/Search';

export const RoutePath = () => (
    <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />}></Route>
    </Routes>
);
