import { useSearchUser } from 'hooks/useSearchUser';
import { useNavigate, useSearchParams } from 'react-router-dom';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
    Avatar,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';

import { PROFILE_PAGE_URL } from '@constant';

import {
    StyleBottomBox,
    StyleButton,
    StyleContainerBox,
    StyleLeftPart,
    StyleListBox,
    StyleListItemBox,
    StyleLoader,
    StyleNotFoundBox,
    StyleSubHeading,
    StyleTextFieldBox,
    StyleTextSpan,
    StyleTopBox,
} from './Search.Container.Style';

export const SearchContainer = () => {
    const [searchQuery, setSearchQuery] = useSearchParams();
    const username = searchQuery.get('username') ?? '';

    const { usernameError, usersList, loading } = useSearchUser(username);

    const navigate = useNavigate();

    const handleOpenProfile = (user: string) => {
        void navigate(`${PROFILE_PAGE_URL}${user}`);
    };

    const handleUsernameChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const trimUsername = e.target.value.trim();
        if (!trimUsername) {
            searchQuery.delete('username');
            setSearchQuery(searchQuery, { replace: true });
            return;
        }
        setSearchQuery({ username: trimUsername }, { replace: true });
    };

    return (
        <>
            <StyleContainerBox>
                <StyleTopBox>
                    <Typography component="h1" variant="h2">
                        Search GitHub
                    </Typography>

                    <StyleSubHeading>
                        <Typography component="h2" variant="h6">
                            Find developers, creators, and collaborators
                        </Typography>
                    </StyleSubHeading>

                    <StyleTextFieldBox
                        id="username"
                        variant="outlined"
                        placeholder="Search username"
                        value={username}
                        name="username"
                        onChange={handleUsernameChange}
                        helperText={usernameError}
                        error={Boolean(usernameError)}
                    />
                </StyleTopBox>

                {username && (
                    <StyleBottomBox>
                        <StyleListBox>
                            {usersList.map((user) => (
                                <StyleListItemBox key={user.login}>
                                    <StyleLeftPart>
                                        <ListItemAvatar>
                                            <Avatar
                                                src={user.avatar_url}
                                                alt={user.login}
                                            ></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={user.login}
                                            secondary={user.name}
                                        />
                                    </StyleLeftPart>
                                    <StyleButton
                                        onClick={() =>
                                            handleOpenProfile(user.login)
                                        }
                                        variant="contained"
                                        aria-label="View Profile"
                                    >
                                        <StyleTextSpan>
                                            View profile
                                        </StyleTextSpan>
                                        <KeyboardArrowRightIcon />
                                    </StyleButton>
                                </StyleListItemBox>
                            ))}
                        </StyleListBox>
                        {!loading && !usersList.length && (
                            <StyleNotFoundBox>
                                <Typography variant="h6" component="h1">
                                    No user found!
                                </Typography>
                            </StyleNotFoundBox>
                        )}
                        {loading && <StyleLoader />}
                    </StyleBottomBox>
                )}
            </StyleContainerBox>
        </>
    );
};
