import { Layout } from 'component/Layout/Layout';
import { Route, Routes } from 'react-router-dom';

import {
    HOME_PAGE_URL,
    LOGIN_PAGE_URL,
    PROFILE_PAGE_URL,
    SEARCH_PAGE_URL,
} from '@constant';
import { Login } from '@pages/Login';
import { NotFound } from '@pages/NotFound';
import { Profile } from '@pages/Profile';
import { Search } from '@pages/Search';

export const RoutePath = () => (
    <Routes>
        <Route element={<Layout />}>
            {[HOME_PAGE_URL, SEARCH_PAGE_URL].map((path, index) => (
                <Route path={path} key={index} element={<Search />} />
            ))}

            <Route
                path={`${PROFILE_PAGE_URL}:username`}
                element={<Profile />}
            />
            <Route path="*" element={<NotFound />} />
        </Route>
        <Route path={LOGIN_PAGE_URL} element={<Login />} />
    </Routes>
);
