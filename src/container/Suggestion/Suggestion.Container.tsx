import { Fragment, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
    Alert,
    Avatar,
    Box,
    CircularProgress,
    IconButton,
    Snackbar,
    SnackbarCloseReason,
    Typography,
} from '@mui/material';

import {
    FETCH_SUGGESTION_LIST_FAILED,
    FETCH_SUGGESTION_PROFILE_FAILED,
    FOLLOW_USER_ERROR,
    PROFILE_PAGE_URL,
} from '@constant';
import { getSuggestionProfiles } from '@services/GetSuggestionProfiles.Service';
import { getUserFollow } from '@services/GetUserFollow.Service';
import { putUserFollow } from '@services/PutUserFollow.Service';
import { useAppSelector } from '@store/store';
import { UserDetail } from '@type/UserDetails.types';

import {
    StyleCloseButton,
    StyleContainer,
    StyleFollowButton,
    StyleHeading,
    StyleLeftPart,
    StyleLoaderContainer,
    StyleMainBox,
    StyleProfile,
    StyleProfileBottom,
    StyleProfiles,
    StyleProfileTop,
    StyleRefreshBox,
    StyleRefreshButton,
    StyleUsername,
} from './Suggestion.Container.Style';

export const SuggestionContainer = () => {
    const navigate = useNavigate();
    const [suggestionList, setSuggestionList] = useState<UserDetail[]>([]);
    const [userLoadingStatus, setUserLoadingStatus] = useState<boolean[]>([]);
    const [userFollowingStatus, setUserFollowingStatus] = useState<boolean[]>(
        [],
    );
    const [error, setError] = useState<string>('');
    const [handleFollowState, setHandleFollowState] = useState<boolean[]>([]);

    const storedData = useAppSelector((state) => state.user);
    const token = storedData.pat;
    const [open, setOpen] = useState(false);

    const handleClose = (
        _event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const fetchSuggestionProfiles = async () => {
        try {
            setUserLoadingStatus([true, true, true]);

            const profiles = await getSuggestionProfiles(token);
            const suggestions = profiles.slice(0, 3);
            setSuggestionList(suggestions);

            if (token) {
                const followingStatus = await Promise.all(
                    suggestions.map((profile) =>
                        getUserFollow(profile.login, token),
                    ),
                );
                setUserFollowingStatus(followingStatus);
            }
        } catch (e) {
            setError(
                e instanceof Error ? e.message : FETCH_SUGGESTION_LIST_FAILED,
            );
            setOpen(true);
        } finally {
            setUserLoadingStatus([false, false, false]);
        }
    };

    useEffect(() => {
        void fetchSuggestionProfiles();
    }, [token]);

    const handleRefreshProfiles = () => {
        void fetchSuggestionProfiles();
    };

    const handleRemoveProfile = async (userLogin: string, index: number) => {
        try {
            setUserLoadingStatus((prev) => {
                const loadingArr = [...prev];
                loadingArr[index] = true;
                return loadingArr;
            });

            const response = await getSuggestionProfiles(token);

            const newProfile = response.find(
                (profile) => profile.login !== userLogin,
            );

            if (newProfile)
                setSuggestionList((prev) =>
                    prev.map((profile) =>
                        profile.login === userLogin ? newProfile : profile,
                    ),
                );
        } catch (e) {
            setError(
                e instanceof Error
                    ? e.message
                    : FETCH_SUGGESTION_PROFILE_FAILED,
            );
            setOpen(true);
        } finally {
            setUserLoadingStatus([false, false, false]);
        }
    };

    const handleOpenProfile = (userLogin: string) => {
        const url = PROFILE_PAGE_URL + userLogin;
        void navigate(url);
    };
    const handleFollowButton = async (
        targetUser: string,
        targetIndex: number,
    ) => {
        setHandleFollowState((prev) => {
            const loadingArr = [...prev];
            loadingArr[targetIndex] = true;
            return loadingArr;
        });
        try {
            const followResponse = await putUserFollow(targetUser, token);

            if (followResponse) {
                setUserFollowingStatus((prev) => {
                    const followArr = [...prev];
                    followArr[targetIndex] = true;
                    return followArr;
                });
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : FOLLOW_USER_ERROR);
            setOpen(true);
        } finally {
            setHandleFollowState([false, false, false]);
        }
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
        <StyleContainer>
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
                    {error}
                </Alert>
            </Snackbar>
            <StyleHeading>
                <Typography component="h1" variant="h4">
                    Suggestions
                </Typography>
                <StyleRefreshBox>
                    <StyleRefreshButton onClick={handleRefreshProfiles}>
                        <RefreshIcon />
                    </StyleRefreshButton>
                </StyleRefreshBox>
            </StyleHeading>

            <StyleMainBox>
                <StyleProfiles>
                    {suggestionList &&
                        suggestionList.map((profile, index) => (
                            <StyleProfile key={profile.login}>
                                {userLoadingStatus[index] ? (
                                    <StyleLoaderContainer>
                                        <CircularProgress />
                                    </StyleLoaderContainer>
                                ) : (
                                    <>
                                        <StyleProfileTop>
                                            <StyleLeftPart
                                                onClick={() =>
                                                    handleOpenProfile(
                                                        profile.login,
                                                    )
                                                }
                                            >
                                                <Avatar
                                                    src={profile.avatar_url}
                                                    alt={profile.login}
                                                />
                                                <Box>
                                                    <Typography component="p">
                                                        {profile.name ??
                                                            profile.login}
                                                    </Typography>
                                                    <StyleUsername>
                                                        @{profile.login}
                                                    </StyleUsername>
                                                </Box>
                                            </StyleLeftPart>
                                            <Box>
                                                <StyleCloseButton
                                                    aria-label="Remove profile"
                                                    onClick={() =>
                                                        void handleRemoveProfile(
                                                            profile.login,
                                                            index,
                                                        )
                                                    }
                                                />
                                            </Box>
                                        </StyleProfileTop>
                                        {token && (
                                            <StyleProfileBottom>
                                                <StyleFollowButton
                                                    onClick={() =>
                                                        void handleFollowButton(
                                                            profile.login,
                                                            index,
                                                        )
                                                    }
                                                    disabled={
                                                        userFollowingStatus[
                                                            index
                                                        ]
                                                    }
                                                >
                                                    {handleFollowState[index]
                                                        ? 'Following'
                                                        : userFollowingStatus[
                                                                index
                                                            ]
                                                          ? 'Followed'
                                                          : 'Follow'}
                                                </StyleFollowButton>
                                            </StyleProfileBottom>
                                        )}
                                    </>
                                )}
                            </StyleProfile>
                        ))}
                </StyleProfiles>
            </StyleMainBox>
        </StyleContainer>
    );
};
