import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import LaunchIcon from '@mui/icons-material/Launch';
import LinkIcon from '@mui/icons-material/Link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import { Box, Button, Typography } from '@mui/material';

import { ErrorMessage } from '@component/ErrorMessage/ErrorMessage.Component';
import {
    FOLLOW_USER_ERROR,
    LOGIN_MSG,
    UNEXPECTED_ERROR_MSG,
    USER_FETCH_FAILED_MSG,
    USER_NOT_FOUND,
} from '@constant';
import { deleteUserFollow } from '@services/DeleteUserFollow.Service';
import { getUser } from '@services/GetUser.Service';
import { getUserFollow } from '@services/GetUserFollow.Service';
import { putUserFollow } from '@services/PutUserFollow.Service';
import { useAppSelector } from '@store/store';
import { NavigationPath } from '@type/NavigationPath.Types';
import { UserDetail } from '@type/userdetails.Types';

import {
    StyleBioBox,
    StyleContainerBox,
    StyleFollowDetailsBox,
    StyleImgBox,
    StyleLinkContainerBox,
    StyleLocationDetailBox,
    StyleMailBox,
    StyleMainContainerBox,
    StyleMidLine,
    StyleMoreDetailBox,
    StyleMoreDetailsBox,
    StyleTopDetailBox,
    StyleVisitButton,
    StyleVisitButtonBox,
} from './Profile.Container.Style';

export const ProfileContainer = () => {
    const navigate = useNavigate();

    const storedData = useAppSelector((state) => state.user);
    const authUser = storedData.userDetails;
    const [error, setError] = useState<string>();
    const token = storedData.pat;
    const [isFollowed, setIsFollowed] = useState<boolean | undefined>(false);

    const [user, setUser] = useState<UserDetail | null>(null);

    const { username } = useParams<{ username: string }>();

    useEffect(() => {
        if (username !== undefined) {
            const fetchUser = async () => {
                try {
                    const userDetail = await getUser(username, token);

                    setUser(userDetail);
                    setError('');
                } catch (e) {
                    const errMsg =
                        e instanceof Error ? e.message : USER_FETCH_FAILED_MSG;
                    setError(errMsg);
                    setUser(null);
                }

                if (authUser) {
                    try {
                        const res = await getUserFollow(username, token);
                        setIsFollowed(res);
                    } catch (e) {
                        const errMsg =
                            e instanceof Error
                                ? e.message
                                : 'Failed to fetch user';
                        setError(errMsg);
                    }
                }
            };
            void fetchUser();
        } else {
            setUser(authUser);
            setError('');
        }
    }, [username, authUser]);

    const handleNavigation = (path: NavigationPath) => {
        void navigate(path);
    };

    const handleOpenGitHubProfile = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    const handleFollow = async () => {
        if (!isFollowed) {
            try {
                const isFollowing = await putUserFollow(username, token);

                if (isFollowing) {
                    setIsFollowed(true);
                    setUser((prev) =>
                        prev
                            ? {
                                  ...prev,
                                  followers: prev.followers + 1,
                              }
                            : prev,
                    );
                }
            } catch (e) {
                setError(e instanceof Error ? e.message : FOLLOW_USER_ERROR);
            }
        } else {
            try {
                const isNotFollowing = await deleteUserFollow(username, token);

                if (isNotFollowing) {
                    setIsFollowed(false);
                    setUser((prev) =>
                        prev
                            ? {
                                  ...(prev
                                      ? {
                                            ...prev,
                                            followers: prev.followers - 1,
                                        }
                                      : prev),
                              }
                            : prev,
                    );
                }
            } catch (e) {
                setError(e instanceof Error ? e.message : FOLLOW_USER_ERROR);
            }
        }

        return undefined;
    };

    if (error) {
        return (
            <ErrorMessage
                alertMessage={error}
                boxMessage={USER_NOT_FOUND}
                buttonName="Search"
                onClickFunction={() => handleNavigation('/search')}
            />
        );
    }

    if (!authUser && !username) {
        return (
            <ErrorMessage
                alertMessage="Please Login"
                boxMessage={LOGIN_MSG}
                buttonName="Login"
                onClickFunction={() => handleNavigation('/login')}
            />
        );
    }

    if (!user) {
        return (
            <ErrorMessage
                alertMessage="Something unexpected occurred."
                boxMessage={UNEXPECTED_ERROR_MSG}
                buttonName="Search"
                onClickFunction={() => handleNavigation('/search')}
            />
        );
    }

    return (
        <StyleContainerBox>
            <StyleMainContainerBox>
                <StyleImgBox src={user?.avatar_url} alt={user?.login} />

                <StyleTopDetailBox>
                    <Typography component="h1" variant="h4">
                        {user?.name ? user?.name : user?.login}
                    </Typography>

                    <Typography component="h2" variant="h5">
                        {user?.location && (
                            <>
                                <StyleLocationDetailBox>
                                    <LocationOnIcon /> {user?.location}
                                </StyleLocationDetailBox>
                            </>
                        )}
                    </Typography>

                    {authUser && username && (
                        <Button
                            sx={{
                                zIndex: 100,
                                pointerEvents: 'auto',
                            }}
                            variant="contained"
                            onClick={() => {
                                void handleFollow();
                            }}
                        >
                            {isFollowed ? 'Followed' : 'Follow'}
                        </Button>
                    )}
                </StyleTopDetailBox>

                <StyleFollowDetailsBox>
                    <Box>
                        <Typography component="h3" variant="h4">
                            {user?.followers}
                        </Typography>
                        <Typography>Followers</Typography>
                    </Box>

                    <StyleMidLine></StyleMidLine>

                    <Box>
                        <Typography component="h3" variant="h4">
                            {user?.following}
                        </Typography>

                        <Typography>Following</Typography>
                    </Box>
                </StyleFollowDetailsBox>
            </StyleMainContainerBox>
            {user?.bio && (
                <StyleBioBox>
                    <Typography>{user?.bio}</Typography>
                </StyleBioBox>
            )}

            <StyleMoreDetailsBox>
                {user?.blog && (
                    <StyleLinkContainerBox
                        href={user?.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <StyleMoreDetailBox>
                            <LinkIcon /> {user?.blog}
                        </StyleMoreDetailBox>
                    </StyleLinkContainerBox>
                )}

                {user?.email && (
                    <Typography component="a" href={`mailto:${user?.email}`}>
                        <StyleMoreDetailBox>
                            <StyleMailBox>
                                <MailIcon /> {user?.email}
                            </StyleMailBox>
                        </StyleMoreDetailBox>
                    </Typography>
                )}
            </StyleMoreDetailsBox>

            <StyleVisitButtonBox>
                <StyleVisitButton
                    variant="contained"
                    onClick={() => handleOpenGitHubProfile(user?.html_url)}
                >
                    <LaunchIcon />
                    Visit GitHub Profile
                </StyleVisitButton>
            </StyleVisitButtonBox>
        </StyleContainerBox>
    );
};
