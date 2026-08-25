import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Snackbar } from '@mui/material';
import { Typography } from '@mui/material';

import { SEARCH_PAGE_URL } from '@constant';

import { StyleContainer } from './NotFound.Container.Style';

export const NotFoundContainer = () => {
    const [open, setOpen] = useState(true);
    const [time, setTime] = useState(5);
    const navigate = useNavigate();

    setTimeout(() => {
        setTime(time - 1);
    }, 1000);

    const handleClose = () => {
        void navigate(SEARCH_PAGE_URL);
        setOpen(false);
    };
    return (
        <StyleContainer>
            <Typography component="h1" variant="h3">
                404 Page not found
            </Typography>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={`Sorry! The page doesn't exist.\nRedirecting to Search page in ${time} seconds.`}
            />
        </StyleContainer>
    );
};
