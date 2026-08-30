import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import LinkIcon from '@mui/icons-material/Link';
import {
    Avatar,
    Box,
    Button,
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
import { NavigationPath } from '@type/NavigationPath.Types';
import { UserDetail } from '@type/userdetails.Types';
import { UserFollow } from '@type/userFollow.Types';
import { UserRepo } from '@type/userRepo.Types';

import {
    StyleBioText,
    StyleBlogLink,
    StyleContainerBox,
    StyleCountDetails,
    StyleDetailBox,
    StyleFollowButton,
    StyleFollowDetails,
    StyleFollowersBox,
    StyleFollowersNameBox,
    StyleFollowHeading,
    StyleFollowingBox,
    StyleImg,
    StyleImgBox,
    StyleLinkIcon,
    StyleListButton,
    StyleListItemBox,
    StyleListLeftPart,
    StyleLocationIcon,
    StyleMainContainer,
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

    const [loading, setLoading] = useState(false);
    let formattedDate;

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
                                : 'Failed to fetch user';
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
            let repo: UserRepo[];
            let followList: UserFollow[];
            let followingList: UserFollow[];
            if (username !== undefined) {
                repo = await getRepositoriesByUser(username, token);
                followList = await getUserFollowList(username, token);
                followingList = await getUserFollowingList(username, token);
            } else {
                repo = await getRepositoriesByUser(authUser?.login, token);
                followList = await getUserFollowList(authUser?.login, token);
                followingList = await getUserFollowingList(
                    authUser?.login,
                    token,
                );
            }
            setUserRepo(repo);
            setUserFollowList(followList);
            setUserFollowingList(followingList);
            setLoading(false);
        };

        void fetchDetails();
    }, [username, authUser, token]);

    const handleNavigation = (path: NavigationPath) => {
        void navigate(path);
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

    const handleOpenProfile = (userLogin: string) => {
        void navigate(`${PROFILE_PAGE_URL}/${userLogin}`);
    };

    const handleOpenLink = (url: string) => {
        window.open(url, '_blank');
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
    } else {
        formattedDate = new Date(user?.created_at).toLocaleDateString('en');
    }

    return (
        <>
            <StyleContainerBox>
                <StyleMainContainer>
                    <StyleProfileDetails>
                        <StyleImgBox>
                            <StyleImg
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
                                >
                                    {isFollowed ? 'Followed' : 'Follow'}
                                </StyleFollowButton>
                            )}

                            <StyleBioText>{user?.bio}</StyleBioText>
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
                                    <StyleBlogLink>
                                        <StyleDetailBox
                                            onClick={() =>
                                                user.blog &&
                                                handleOpenLink(user?.blog)
                                            }
                                        >
                                            <StyleLinkIcon /> {user?.blog}
                                        </StyleDetailBox>
                                    </StyleBlogLink>
                                )}
                            </Typography>
                            <Typography component="h2" variant="h5">
                                <StyleDetailBox>
                                    Joined {formattedDate}
                                </StyleDetailBox>
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

                            <Box>
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        handleOpenLink(user?.html_url)
                                    }
                                >
                                    <LinkIcon />
                                    View on GitHub
                                </Button>
                            </Box>
                        </StyleTopDetailBox>
                    </StyleProfileDetails>
                    <StyleRepoDetails>
                        <Typography component="h2" variant="h4">
                            Repositories
                        </Typography>
                        {userRepo.map((repo) => (
                            <div key={repo.name}>
                                <StyleRepoCard
                                    onClick={() =>
                                        handleOpenLink(repo.html_url)
                                    }
                                >
                                    <StyleRepoName>{repo.name}</StyleRepoName>
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
                                </StyleRepoCard>
                            </div>
                        ))}
                    </StyleRepoDetails>

                    <StyleFollowDetails>
                        <StyleFollowersBox>
                            <StyleFollowHeading>Followers</StyleFollowHeading>

                            <Box>
                                {userFollowList.map((follow) => (
                                    <StyleListItemBox key={follow.login}>
                                        <StyleListButton
                                            onClick={() =>
                                                handleOpenProfile(follow.login)
                                            }
                                            variant="contained"
                                            aria-label="View Profile"
                                        >
                                            <StyleListLeftPart>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <img
                                                            src={
                                                                follow.avatar_url
                                                            }
                                                            alt={follow.login}
                                                            height="40px"
                                                            width="40px"
                                                        />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={follow.login}
                                                    secondary={follow.name}
                                                />
                                            </StyleListLeftPart>
                                        </StyleListButton>
                                    </StyleListItemBox>
                                ))}
                            </Box>
                        </StyleFollowersBox>

                        <StyleFollowingBox>
                            <StyleFollowHeading>Following</StyleFollowHeading>

                            <Box>
                                {userFollowingList.map((follow) => (
                                    <StyleListItemBox key={follow.login}>
                                        <StyleListButton
                                            onClick={() =>
                                                handleOpenProfile(follow.login)
                                            }
                                            variant="contained"
                                            aria-label="View Profile"
                                        >
                                            <StyleListLeftPart>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <img
                                                            src={
                                                                follow.avatar_url
                                                            }
                                                            alt={follow.login}
                                                            height="40px"
                                                            width="40px"
                                                        />
                                                    </Avatar>
                                                </ListItemAvatar>

                                                <StyleFollowersNameBox>
                                                    <ListItemText
                                                        primary={follow.login}
                                                        secondary={follow.name}
                                                    />
                                                </StyleFollowersNameBox>
                                            </StyleListLeftPart>
                                        </StyleListButton>
                                    </StyleListItemBox>
                                ))}
                            </Box>
                        </StyleFollowingBox>
                    </StyleFollowDetails>
                </StyleMainContainer>
            </StyleContainerBox>

            {loading && <Loader />}
        </>
    );
};
