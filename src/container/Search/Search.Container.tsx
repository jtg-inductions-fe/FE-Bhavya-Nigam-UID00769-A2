import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
    Avatar,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';

import { PROFILE_PAGE_URL, SEARCH_USER_ERROR } from '@constant';
import { getUserLists } from '@services/GetUsersList.Service';
import { useAppSelector } from '@store/store';
import { UserSearchResult } from '@type/userSearchResult';

import {
    StyleBottomBox,
    StyleButton,
    StyleContainerBox,
    StyleInputField,
    StyleLeftPart,
    StyleListBox,
    StyleListItemBox,
    StyleTextSpan,
    StyleTopBox,
} from './Search.Container.Style';

export const SearchContainer = () => {
    const storedData = useAppSelector((state) => state.user);
    const pat = storedData.pat;
    const [usernameError, setUsernameError] = useState('');
    const [username, setUsername] = useState('');
    const [usersList, setUsersList] = useState<UserSearchResult[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setUsernameError('');
            if (!username.trim()) {
                setUsersList([]);
                return;
            }
            const searchUsers = async () => {
                try {
                    const data = await getUserLists(pat, username.trim());
                    setUsersList(data);
                } catch (e) {
                    setUsernameError(
                        e instanceof Error ? e.message : SEARCH_USER_ERROR,
                    );
                }
            };

            void searchUsers();
        }, 500);

        return () => clearTimeout(timer);
    }, [username, pat]);

    const handleOpenProfile = (user: string) => {
        void navigate(`${PROFILE_PAGE_URL}${user}`);
    };

    return (
        <StyleContainerBox>
            <StyleTopBox>
                <Typography component="h1" variant="h2">
                    Search GitHub
                </Typography>

                <Typography component="h2" variant="h6">
                    Find developers, creators, and collaborators
                </Typography>

                <StyleInputField
                    placeholder="Search username"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
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
                                    <StyleTextSpan>View profile</StyleTextSpan>
                                    <KeyboardArrowRightIcon />
                                </StyleButton>
                            </StyleListItemBox>
                        ))}
                    </StyleListBox>
                </StyleBottomBox>
            )}
        </StyleContainerBox>
    );
};
