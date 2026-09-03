import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import LinkIcon from '@mui/icons-material/Link';
import {
    Avatar,
    Box,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';

import { ErrorMessage } from '@component/ErrorMessage/ErrorMessage.Component';
import { Loader } from '@component/Loader/Loader.Component';
import {
    FOLLOW_USER_ERROR,
    LOGIN_MSG,
    PROFILE_PAGE_URL,
    UNEXPECTED_ERROR_MSG,
    USER_DATA_FETCH_FAILED_MSG,
    USER_FETCH_FAILED_MSG,
    USER_NOT_FOUND,
} from '@constant';
import { deleteUserFollow } from '@services/DeleteUserFollow.Service';
import { getRepositoriesByUser } from '@services/GetRepositories.Service';
import { getUser } from '@services/GetUser.Service';
import { getUserFollow } from '@services/GetUserFollow.Service';
import { getUserFollowingList } from '@services/GetUserFollowingList.Service';
import { getUserFollowList } from '@services/GetUserFollowList.Service';
import { putUserFollow } from '@services/PutUserFollow.Service';
import { useAppSelector } from '@store/store';
import { NavigationPath } from '@type/NavigationPath.types';
import { UserDetail } from '@type/UserDetails.types';
import { UserFollow } from '@type/UserFollow.types';
import { UserRepo } from '@type/UserRepo.types';

import {
    StyleBioText,
    StyleCardLink,
    StyleContainerBox,
    StyleCountDetails,
    StyleDetailBox,
    StyleExternalLink,
    StyleFollowButton,
    StyleFollowDetails,
    StyleFollowersBox,
    StyleFollowersNameBox,
    StyleFollowHeading,
    StyleFollowingBox,
    StyleGitHubLink,
    StyleImg,
    StyleImgBox,
    StyleLinkIcon,
    StyleListBox,
    StyleListButton,
    StyleListItemBox,
    StyleListLeftPart,
    StyleLocationIcon,
    StyleMailIcon,
    StyleMainContainer,
    StyleNotDataText,
    StyleNumberDetails,
    StyleProfileDetails,
    StyleRepoCard,
    StyleRepoDescription,
    StyleRepoDetails,
    StyleRepoMoreDetails,
    StyleRepoName,
    StyleRepoStars,
    StyleStarIcon,
    StyleSubCountHeadingDetails,
    StyleTopDetailBox,
    StyleUsernameText,
} from './Profile.Container.Style';

export const ProfileContainer = () => {
    const navigate = useNavigate();

    const storedData = useAppSelector((state) => state.user);
    const authUser = storedData.userDetails;
    const [error, setError] = useState<string>();
    const token = storedData.pat;
    const [isFollowed, setIsFollowed] = useState<boolean | undefined>(false);
    const [handleFollowState, setHandleFollowState] = useState(false);

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState<UserDetail | null>(null);
    const [userRepo, setUserRepo] = useState<UserRepo[]>([]);
    const [userFollowList, setUserFollowList] = useState<UserFollow[]>([]);
    const [userFollowingList, setUserFollowingList] = useState<UserFollow[]>(
        [],
    );
    const { username } = useParams<{ username: string }>();

    useEffect(() => {
        if (username !== undefined) {
            const fetchUser = async () => {
                setLoading(true);
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
                                : USER_FETCH_FAILED_MSG;
                        setError(errMsg);
                    }
                }
            };
            void fetchUser();
            setLoading(false);
        } else {
            setUser(authUser);
            setError('');
        }

        const fetchDetails = async () => {
            setLoading(true);

            try {
                const repo = await getRepositoriesByUser(
                    username ? username : authUser?.login,
                    token,
                );
                const followList = await getUserFollowList(
                    username ? username : authUser?.login,
                    token,
                );
                const followingList = await getUserFollowingList(
                    username ? username : authUser?.login,
                    token,
                );
                setUserRepo(repo);
                setUserFollowList(followList);
                setUserFollowingList(followingList);
            } catch (e) {
                setError(
                    e instanceof Error ? e.message : USER_DATA_FETCH_FAILED_MSG,
                );
            } finally {
                setLoading(false);
            }
        };

        void fetchDetails();
    }, [username, authUser, token]);

    const handleNavigation = (path: NavigationPath) => {
        void navigate(path);
    };

    const handleFollow = async () => {
        setHandleFollowState(true);
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
            } finally {
                setHandleFollowState(false);
            }
        } else {
            try {
                const isNotFollowing = await deleteUserFollow(username, token);

                if (isNotFollowing) {
                    setIsFollowed(false);
                    setUser((prev) =>
                        prev
                            ? {
                                  ...prev,
                                  followers: prev.followers - 1,
                              }
                            : prev,
                    );
                }
            } catch (e) {
                setError(e instanceof Error ? e.message : FOLLOW_USER_ERROR);
            } finally {
                setHandleFollowState(false);
            }
        }
    };

    const handleOpenProfile = (userLogin: string) => {
        void navigate(`${PROFILE_PAGE_URL}/${userLogin}`);
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <ErrorMessage
                alertMessage={error}
                boxMessage={USER_NOT_FOUND}
                buttonName="Search"
                onClickFunction={() => {
                    void handleNavigation('/search');
                }}
            />
        );
    }

    if (!authUser && !username) {
        return (
            <ErrorMessage
                alertMessage="Please Login"
                boxMessage={LOGIN_MSG}
                buttonName="Login"
                onClickFunction={() => {
                    void handleNavigation('/login');
                }}
            />
        );
    }

    if (!user) {
        return (
            <ErrorMessage
                alertMessage="Something unexpected occurred."
                boxMessage={UNEXPECTED_ERROR_MSG}
                buttonName="Search"
                onClickFunction={() => {
                    void handleNavigation('/search');
                }}
            />
        );
    }

    return (
        <>
            <Box component="main">
                <StyleContainerBox>
                    <StyleMainContainer>
                        <StyleProfileDetails>
                            <StyleImgBox>
                                <StyleImg
                                    loading="eager"
                                    src={user?.avatar_url}
                                    alt={user?.login}
                                />
                            </StyleImgBox>

                            <StyleTopDetailBox>
                                <Box>
                                    <Typography component="h1" variant="h5">
                                        {user?.name ? user?.name : user?.login}
                                    </Typography>

                                    <StyleUsernameText>
                                        {'@'}

                                        {user?.login}
                                    </StyleUsernameText>
                                </Box>

                                {authUser && username && (
                                    <StyleFollowButton
                                        variant="contained"
                                        onClick={() => {
                                            void handleFollow();
                                        }}
                                        disabled={handleFollowState}
                                    >
                                        {isFollowed
                                            ? handleFollowState
                                                ? 'Unfollowing'
                                                : 'Followed'
                                            : handleFollowState
                                              ? 'Following'
                                              : 'Follow'}
                                    </StyleFollowButton>
                                )}

                                <StyleBioText>{user?.bio}</StyleBioText>
                                <Typography component="h2" variant="h5">
                                    {user?.email && (
                                        <>
                                            <StyleExternalLink>
                                                <StyleDetailBox>
                                                    <StyleMailIcon />{' '}
                                                    {user?.email}
                                                </StyleDetailBox>
                                            </StyleExternalLink>
                                        </>
                                    )}
                                </Typography>
                                <Typography component="h2" variant="h5">
                                    {user?.location && (
                                        <>
                                            <StyleDetailBox>
                                                <StyleLocationIcon />{' '}
                                                {user?.location}
                                            </StyleDetailBox>
                                        </>
                                    )}
                                </Typography>
                                <Typography component="h2" variant="h5">
                                    {user?.blog && (
                                        <StyleExternalLink>
                                            <StyleDetailBox
                                                href={user?.blog}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <StyleLinkIcon /> {user?.blog}
                                            </StyleDetailBox>
                                        </StyleExternalLink>
                                    )}
                                </Typography>

                                <StyleCountDetails>
                                    <StyleSubCountHeadingDetails>
                                        <StyleNumberDetails>
                                            {user?.followers}
                                        </StyleNumberDetails>
                                        Followers
                                    </StyleSubCountHeadingDetails>
                                    <StyleSubCountHeadingDetails>
                                        <StyleNumberDetails>
                                            {user?.following}
                                        </StyleNumberDetails>
                                        Following
                                    </StyleSubCountHeadingDetails>
                                    <StyleSubCountHeadingDetails>
                                        <StyleNumberDetails>
                                            {user?.public_repos}
                                        </StyleNumberDetails>
                                        <Box>Repositories</Box>
                                    </StyleSubCountHeadingDetails>
                                </StyleCountDetails>

                                <StyleGitHubLink
                                    href={user?.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <LinkIcon />
                                    View on GitHub
                                </StyleGitHubLink>
                            </StyleTopDetailBox>
                        </StyleProfileDetails>
                        <StyleRepoDetails>
                            <Typography component="h2" variant="h4">
                                Repositories
                            </Typography>
                            {!userRepo.length && (
                                <StyleNotDataText>
                                    No public repository available to show
                                </StyleNotDataText>
                            )}

                            {userRepo.map((repo) => (
                                <div key={repo.name}>
                                    <StyleRepoCard>
                                        <StyleCardLink
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <StyleRepoName>
                                                {repo.name}
                                            </StyleRepoName>
                                            <StyleRepoDescription>
                                                {repo.description}
                                            </StyleRepoDescription>
                                            <StyleRepoMoreDetails>
                                                <Box>{repo.language}</Box>
                                                <StyleRepoStars>
                                                    <StyleStarIcon />
                                                    <Typography>
                                                        {repo.stargazers_count}
                                                    </Typography>
                                                </StyleRepoStars>
                                            </StyleRepoMoreDetails>
                                        </StyleCardLink>
                                    </StyleRepoCard>
                                </div>
                            ))}
                        </StyleRepoDetails>

                        <StyleFollowDetails>
                            <StyleFollowersBox>
                                <StyleFollowHeading>
                                    Followers
                                </StyleFollowHeading>

                                <StyleListBox>
                                    {!userFollowList.length && (
                                        <StyleNotDataText>
                                            User has no followers
                                        </StyleNotDataText>
                                    )}
                                    {userFollowList.map((follow) => (
                                        <StyleListItemBox key={follow.login}>
                                            <StyleListButton
                                                onClick={() =>
                                                    handleOpenProfile(
                                                        follow.login,
                                                    )
                                                }
                                                variant="contained"
                                                aria-label="View Profile"
                                            >
                                                <StyleListLeftPart>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            src={
                                                                follow.avatar_url
                                                            }
                                                            alt={follow.login}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={follow.login}
                                                        secondary={follow.name}
                                                    />
                                                </StyleListLeftPart>
                                            </StyleListButton>
                                        </StyleListItemBox>
                                    ))}
                                </StyleListBox>
                            </StyleFollowersBox>

                            <StyleFollowingBox>
                                <StyleFollowHeading>
                                    Following
                                </StyleFollowHeading>

                                <StyleListBox>
                                    {!userFollowingList.length && (
                                        <StyleNotDataText>
                                            User has no following
                                        </StyleNotDataText>
                                    )}

                                    {userFollowingList.map((follow) => (
                                        <StyleListItemBox key={follow.login}>
                                            <StyleListButton
                                                onClick={() =>
                                                    handleOpenProfile(
                                                        follow.login,
                                                    )
                                                }
                                                variant="contained"
                                                aria-label="View Profile"
                                            >
                                                <StyleListLeftPart>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            src={
                                                                follow.avatar_url
                                                            }
                                                            alt={follow.login}
                                                        />
                                                    </ListItemAvatar>

                                                    <StyleFollowersNameBox>
                                                        <ListItemText
                                                            primary={
                                                                follow.login
                                                            }
                                                            secondary={
                                                                follow.name
                                                            }
                                                        />
                                                    </StyleFollowersNameBox>
                                                </StyleListLeftPart>
                                            </StyleListButton>
                                        </StyleListItemBox>
                                    ))}
                                </StyleListBox>
                            </StyleFollowingBox>
                        </StyleFollowDetails>
                    </StyleMainContainer>
                </StyleContainerBox>
            </Box>
        </>
    );
};
