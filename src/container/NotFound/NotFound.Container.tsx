import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { HOME_PAGE_URL } from '@constant';

export const NotFoundContainer = () => {
    const navigate = useNavigate();
    useEffect(() => {
        void navigate(HOME_PAGE_URL);
    });
    return <div>Not Found </div>;
};
