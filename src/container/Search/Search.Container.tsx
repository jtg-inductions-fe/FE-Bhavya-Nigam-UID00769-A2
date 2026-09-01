import { useState } from 'react';

import { useSearchUser } from 'hooks/useSearchUser';
import { useNavigate } from 'react-router-dom';

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
    StyleInputField,
    StyleLeftPart,
    StyleListBox,
    StyleListItemBox,
    StyleTextSpan,
    StyleTopBox,
} from './Search.Container.Style';

export const SearchContainer = () => {
    const [username, setUsername] = useState<string>('');

    const { usernameError, usersList } = useSearchUser(username);

    const navigate = useNavigate();

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
                    onChange={(
                        e: React.ChangeEvent<
                            HTMLInputElement | HTMLTextAreaElement
                        >,
                    ) => {
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
