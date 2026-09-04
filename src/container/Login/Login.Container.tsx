import { Fragment, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import GithubIcon from '@mui/icons-material/GitHub';
import {
    Alert,
    IconButton,
    Snackbar,
    SnackbarCloseReason,
    Typography,
} from '@mui/material';

import {
    LOGIN_FAILED_MSG,
    PASSWORD_ERROR_MSG,
    PROFILE_PAGE_URL,
    SEARCH_PAGE_URL,
    USERNAME_ERROR_MSG,
} from '@constant';
import { login } from '@features/User.Slice';
import { getUser } from '@services/User.Service';
import { useAppDispatch, useAppSelector } from '@store/store';

import {
    StyleCenterBox,
    StyledBox,
    StyledFormBox,
    StyledIconBox,
    StyleLabel,
    StyleLink,
    StyleLoginButton,
    StyleMainBox,
    StyleTextBox,
    StyleTextFieldBox,
} from './Login.Container.Style';

export const LoginContainer = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [pat, setPat] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [patError, setPatError] = useState('');

    const [loginError, setLoginError] = useState<string | null>(null);
    const storedData = useAppSelector((state) => state.user);
    const storedPat = storedData.pat;
    const [open, setOpen] = useState(false);

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const storedUsername = storedData.username;

    useEffect(() => {
        if (storedPat) void navigate(PROFILE_PAGE_URL + storedUsername);
    });

    let error = false;

    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        error = false;

        const trimUsername = username.trim();
        const trimPassword = pat.trim();

        if (trimUsername.length < 1) {
            setUsernameError(USERNAME_ERROR_MSG);
            error = true;
        }

        if (!trimPassword) {
            setPatError(PASSWORD_ERROR_MSG);
            error = true;
        }

        if (error) return;

        try {
            const res = await getUser(trimPassword, trimUsername);

            dispatch(
                login({
                    userDetails: res,
                    username: trimUsername,
                    pat: trimPassword,
                }),
            );

            const url = PROFILE_PAGE_URL + trimUsername;
            void navigate(url);
        } catch (err) {
            const errMsg =
                err instanceof Error ? err.message : LOGIN_FAILED_MSG;
            setLoginError(errMsg);
            setOpen(true);
        }
    };

    const handleUsernameInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setUsername(e.target.value);
        setOpen(false);
        setUsernameError('');
        setLoginError(null);
    };

    const handlePasswordInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setPat(e.target.value);
        setOpen(false);
        setPatError('');
        setLoginError(null);
    };

    const action = (
        <Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

    return (
        <StyledBox>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                action={action}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {loginError}
                </Alert>
            </Snackbar>
            <StyleMainBox>
                <StyledIconBox>
                    <GithubIcon fontSize="large" />
                </StyledIconBox>

                <StyleCenterBox>
                    <Typography component="h1" variant="h6">
                        Login to your account
                    </Typography>
                </StyleCenterBox>

                <StyleTextBox>
                    Enter your credentials below to login to your account
                </StyleTextBox>

                <form
                    onSubmit={(e) => {
                        void handleSubmit(e);
                    }}
                >
                    <StyledFormBox>
                        <StyleLabel>Username</StyleLabel>

                        <StyleTextFieldBox
                            id="username"
                            variant="outlined"
                            placeholder="username"
                            value={username}
                            name="username"
                            onChange={(
                                e: React.ChangeEvent<
                                    HTMLInputElement | HTMLTextAreaElement
                                >,
                            ) => void handleUsernameInput(e)}
                            helperText={usernameError}
                            error={Boolean(usernameError)}
                        />

                        <StyleLabel>Personal Access Token</StyleLabel>

                        <StyleTextFieldBox
                            id="pat"
                            variant="outlined"
                            value={pat}
                            name="pat"
                            onChange={(
                                e: React.ChangeEvent<
                                    HTMLInputElement | HTMLTextAreaElement
                                >,
                            ) => void handlePasswordInput(e)}
                            type="password"
                            helperText={patError}
                            error={Boolean(patError)}
                        />

                        <StyleLoginButton type="submit" variant="contained">
                            Login
                        </StyleLoginButton>

                        <StyleCenterBox>
                            <StyleTextBox>
                                Skip Login?{' '}
                                <StyleLink to={SEARCH_PAGE_URL}>
                                    Search
                                </StyleLink>{' '}
                                directly without login.
                            </StyleTextBox>
                        </StyleCenterBox>
                    </StyledFormBox>
                </form>
            </StyleMainBox>
        </StyledBox>
    );
};
