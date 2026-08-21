import { useState } from 'react';

import { login } from 'features/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from 'services/authService';

import GithubIcon from '@mui/icons-material/GitHub';
import { Alert, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {
    StyledBox,
    StyledFormBox,
    StyledIconBox,
    StyleMainBox,
} from './Login.Container.Style';

export const LoginComponent = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [pat, setPat] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [patError, setPatError] = useState('');

    const [loginError, setLoginError] = useState<string | null>(null);

    let error = false;

    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        error = false;

        const trimUsername = username.trim();
        const trimPassword = pat.trim();

        if (trimUsername.length < 1) {
            setUsernameError('Username must be atleast 1 characters');
            error = true;
        }

        if (!trimPassword) {
            setPatError('Password / token is required');
            error = true;
        }

        if (error) return;

        try {
            const res = await getUser(trimPassword, trimUsername);

            dispatch(
                login({
                    user: res,
                    isLoggedIn: true,
                }),
            );

            void navigate('/profile');
        } catch (err) {
            const errMsg = err instanceof Error ? err.message : 'Login failed';
            setLoginError(errMsg);
        }
    };

    return (
        <StyledBox>
            <StyleMainBox>
                <StyledIconBox>
                    <GithubIcon fontSize="large" />
                </StyledIconBox>

                <Typography component="h1" variant="h3">
                    Login with GitHub
                </Typography>

                <Typography component="p">Enter your credentials.</Typography>

                <form
                    onSubmit={(e) => {
                        void handleSubmit(e);
                    }}
                >
                    <StyledFormBox>
                        <TextField
                            id="username"
                            label="Username"
                            variant="outlined"
                            value={username}
                            name="username"
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setUsernameError('');
                                setLoginError(null);
                            }}
                            helperText={usernameError}
                            error={Boolean(usernameError)}
                        />

                        <TextField
                            id="pat"
                            label="Personal Access Token"
                            variant="outlined"
                            value={pat}
                            name="pat"
                            onChange={(e) => {
                                setPat(e.target.value);
                                setPatError('');
                                setLoginError(null);
                            }}
                            type="password"
                            helperText={patError}
                            error={Boolean(patError)}
                        />

                        {loginError && (
                            <Alert severity="error" variant="outlined">
                                {loginError}
                            </Alert>
                        )}

                        <Button type="submit" variant="contained">
                            Login
                        </Button>
                    </StyledFormBox>
                </form>
            </StyleMainBox>
        </StyledBox>
    );
};
