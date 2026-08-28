import { useEffect, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';

import LaunchIcon from '@mui/icons-material/Launch';
import LinkIcon from '@mui/icons-material/Link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import { Box, Typography } from '@mui/material';

import { ErrorMessage } from '@component/ErrorMessage/ErrorMessage.Component';
import { LOGIN_MSG, UNEXPECTED_ERROR_MSG, USER_NOT_FOUND } from '@constant';
import { getUser } from '@services/GetUser.Service';
import { useAppSelector } from '@store/store';
import { NavigationPath } from '@type/NavigationPath';
import { UserDetail } from '@type/userdetails.Types';

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

    const storedData = useAppSelector((state) => state.user);
    const authUser = storedData.userDetails;
    const [error, setError] = useState<string>();
    const token = storedData.pat;

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

    const handleNavigation = (path: NavigationPath) => {
        void navigate(path);
    };

    if (error) {
        return (
            <ErrorMessage
                alertMessage={error}
                boxMessage={USER_NOT_FOUND}
                buttonName="Search"
                onClickFunction={handleNavigation('/search')}
            />
        );
    }

    if (!authUser && !username) {
        return (
            <ErrorMessage
                alertMessage="Please Login"
                boxMessage={LOGIN_MSG}
                buttonName="Login"
                onClickFunction={handleNavigation('/login')}
            />
        );
    }

    if (!user) {
        return (
            <ErrorMessage
                alertMessage="Something unexpected occurred."
                boxMessage={UNEXPECTED_ERROR_MSG}
                buttonName="Search"
                onClickFunction={handleNavigation('/search')}
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
