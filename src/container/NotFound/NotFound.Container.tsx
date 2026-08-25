import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Alert, Snackbar, Typography } from '@mui/material';

import {
    PAGE_NOT_FOUND_ERROR_MSG,
    PAGE_NOTIFY_ERROR_MSG,
    SEARCH_PAGE_URL,
} from '@constant';

import { StyleContainer } from './NotFound.Container.Style';

export const NotFoundContainer = () => {
    const [open, setOpen] = useState(true);
    const [time, setTime] = useState(5);
    const navigate = useNavigate();
    const pageNotFound = PAGE_NOT_FOUND_ERROR_MSG;
    const pageNotifyMsg = PAGE_NOTIFY_ERROR_MSG;

    useEffect(() => {
        if (!open || time <= 0) {
            handleClose();
            return;
        } else {
            const timer = setTimeout(() => {
                setTime(time - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [open, time]);

    const handleClose = () => {
        void navigate(SEARCH_PAGE_URL);
        setOpen(false);
    };
    return (
        <StyleContainer>
            <Typography component="h1" variant="h3">
                {pageNotFound}
            </Typography>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {`${pageNotifyMsg} Redirecting to Search page in ${time} seconds.`}
                </Alert>
            </Snackbar>
        </StyleContainer>
    );
};
