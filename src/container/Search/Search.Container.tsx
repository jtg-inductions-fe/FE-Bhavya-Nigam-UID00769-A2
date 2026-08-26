import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
    Avatar,
    Box,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';

import {
    LOCAL_STORAGE_PAT,
    PROFILE_PAGE_URL,
    SEARCH_USER_ERROR,
} from '@constant';
import { getUserLists } from '@services/GetUsersList.Service';
import { UserSearchResult } from '@type/userSearchResult';

import {
    StyleBottomBox,
    StyleButton,
    StyleContainerBox,
    StyleInputField,
    StyleLeftPart,
    StyleListBox,
    StyleListItemBox,
    StyleTextBox,
    StyleTopBox,
} from './Search.Container.Style';

export const SearchContainer = () => {
    const [usernameError, setUsernameError] = useState('');
    const [username, setUsername] = useState('');
    const [usersList, setUsersList] = useState<UserSearchResult[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!username.trim()) {
                setUsersList([]);
                return;
            }
            const searchUsers = async () => {
                try {
                    const token = localStorage.getItem(LOCAL_STORAGE_PAT);
                    const data = await getUserLists(token, username.trim());
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
    }, [username]);

    const handleSubmit = (user: string) => {
        void navigate(`${PROFILE_PAGE_URL}/${user}`);
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

                {usernameError}
                <StyleInputField
                    placeholder="Search username"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
            </StyleTopBox>

            <StyleBottomBox>
                {username !== '' && (
                    <StyleListBox>
                        {usersList.map((user) => (
                            <StyleListItemBox key={user.login}>
                                <StyleLeftPart>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <img
                                                src={user.avatar_url}
                                                alt={user.login}
                                                height="40px"
                                                width="40px"
                                            />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.login}
                                        secondary={user.name}
                                    />
                                </StyleLeftPart>
                                <Box>
                                    <StyleButton
                                        onClick={() => handleSubmit(user.login)}
                                        variant="contained"
                                    >
                                        <StyleTextBox>
                                            <Typography component="p">
                                                View profile
                                            </Typography>
                                        </StyleTextBox>
                                        <KeyboardArrowRightIcon />
                                    </StyleButton>
                                </Box>
                            </StyleListItemBox>
                        ))}
                    </StyleListBox>
                )}
            </StyleBottomBox>
        </StyleContainerBox>
    );
};
