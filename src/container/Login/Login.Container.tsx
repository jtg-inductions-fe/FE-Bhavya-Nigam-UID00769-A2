import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import GithubIcon from '@mui/icons-material/GitHub';
import { Alert, Typography } from '@mui/material';

import {
    LOGIN_FAILED_MSG,
    PASSWORD_ERROR_MSG,
    PROFILE_PAGE_URL,
    SEARCH_PAGE_URL,
    USERNAME_ERROR_MSG,
} from '@constant';
import { login } from '@features/User.Slice';
import { getUser } from '@services/User.Service';
import { useAppDispatch } from '@store/store';

import {
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
        }
    };

    const handleUsernameInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setUsername(e.target.value);
        setUsernameError('');
        setLoginError(null);
    };

    const handlePasswordInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setPat(e.target.value);
        setPatError('');
        setLoginError(null);
    };

    return (
        <StyledBox>
            <StyleMainBox>
                <StyledIconBox>
                    <GithubIcon fontSize="large" />
                </StyledIconBox>

                <Typography component="h1" variant="h6">
                    Login to your account
                </Typography>

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

                        {loginError && (
                            <Alert severity="error" variant="outlined">
                                {loginError}
                            </Alert>
                        )}

                        <StyleLoginButton type="submit" variant="contained">
                            Login
                        </StyleLoginButton>

                        <StyleTextBox>
                            Skip Login?{' '}
                            <StyleLink to={SEARCH_PAGE_URL}>Search</StyleLink>{' '}
                            directly without login.
                        </StyleTextBox>
                    </StyledFormBox>
                </form>
            </StyleMainBox>
        </StyledBox>
    );
};
