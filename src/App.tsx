import { Login } from 'pages/Login';
import { Profile } from 'pages/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './theme/index';

export const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    </BrowserRouter>
);
