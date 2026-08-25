import { useEffect, useState } from 'react';

import { ErrorMessage } from 'component/ErrorMessage';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import LaunchIcon from '@mui/icons-material/Launch';
import LinkIcon from '@mui/icons-material/Link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import { Box, Typography } from '@mui/material';

import { LOCAL_STORAGE_PAT, LOGIN_PAGE_URL, SEARCH_PAGE_URL } from '@constant';
import { getUser } from '@services/getUserService';
import { RootState } from '@store/store';
import { UserDetail } from '@type/userdetails';

import {
    StyleBioBox,
    StyleContainerBox,
    StyleFollowDetailsBox,
    StyleImgBox,
    StyleLinkContainerBox,
    StyleLocationDetailBox,
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

    const authUser = useSelector((state: RootState) => state.user?.user);
    const [error, setError] = useState<string>();

    const [user, setUser] = useState<UserDetail | null>(null);

    const { username } = useParams<{ username: string }>();

    useEffect(() => {
        if (username !== undefined) {
            const token = localStorage.getItem(LOCAL_STORAGE_PAT);

            const fetchUser = async () => {
                try {
                    const userDetail = await getUser(username, token);
                    setUser(userDetail);
                    setError('');
                } catch (e) {
                    const errMsg =
                        e instanceof Error ? e.message : 'Failed to fetch user';
                    setError(errMsg);
                    setUser(null);
                }
            };
            void fetchUser();
        } else {
            setUser(authUser);
            setError('');
        }
    }, [username, authUser]);

    const handleLogin = () => {
        void navigate(LOGIN_PAGE_URL);
    };

    const handleSearch = () => {
        void navigate(SEARCH_PAGE_URL);
    };

    if (error) {
        return (
            <ErrorMessage
                message={error}
                buttonName="Search"
                onClickFunction={handleSearch}
            />
        );
    }

    if (!authUser && !username) {
        return (
            <ErrorMessage
                message="Please Login"
                buttonName="Login"
                onClickFunction={handleLogin}
            />
        );
    }

    if (!user) {
        return (
            <ErrorMessage
                message="Something unexpected occurred."
                buttonName="Search"
                onClickFunction={handleSearch}
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
            {user?.bio ? (
                <StyleBioBox>
                    <Typography>{user?.bio}</Typography>
                </StyleBioBox>
            ) : (
                ''
            )}

            <StyleMoreDetailsBox>
                {user?.blog ? (
                    <StyleLinkContainerBox to={user?.blog} target="_blank">
                        <StyleMoreDetailBox>
                            <LinkIcon /> {user?.blog}
                        </StyleMoreDetailBox>
                    </StyleLinkContainerBox>
                ) : (
                    ''
                )}

                {user?.email ? (
                    <Typography component="a" href={`mailto:${user?.email}`}>
                        <StyleMoreDetailBox>
                            <MailIcon /> {user?.email}
                        </StyleMoreDetailBox>
                    </Typography>
                ) : (
                    ''
                )}
            </StyleMoreDetailsBox>

            <StyleVisitButtonBox>
                <Link to={user?.html_url} target="_blank">
                    <StyleVisitButton variant="contained">
                        <LaunchIcon />
                        Visit GitHub Profile
                    </StyleVisitButton>
                </Link>
            </StyleVisitButtonBox>
        </StyleContainerBox>
    );
};
