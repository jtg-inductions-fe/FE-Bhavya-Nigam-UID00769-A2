import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { ErrorMessage } from '@component/ErrorMessage/ErrorMessage.Component';
import { HOME_PAGE_URL, PAGE_NOT_FOUND_ERROR_MSG } from '@constant';

import { StyleContainer } from './NotFound.Container.Style';

export const NotFoundContainer = () => {
    const navigate = useNavigate();
    const pageNotFound = PAGE_NOT_FOUND_ERROR_MSG;

    const handleSearch = () => {
        void navigate(HOME_PAGE_URL);
    };
    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <StyleContainer>
            <ErrorMessage
                alertMessage="Page not found"
                boxMessage={pageNotFound}
                buttonName="Search"
                onClickFunction={handleSearch}
            />
        </StyleContainer>
    );
};
