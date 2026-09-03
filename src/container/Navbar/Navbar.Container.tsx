import * as React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import {
    HOME_PAGE_URL,
    LOGIN_PAGE_URL,
    PROFILE_PAGE_URL,
    SEARCH_PAGE_URL,
} from '@constant';
import { logout } from '@features/User.Slice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { NavigationPath } from '@type/NavigationPath.types';

import {
    StyleAppBar,
    StyleButtonBox,
    StyleGitHubIcon,
    StyleLinkBox,
    StyleLinkContainerBox,
    StyleLogoHeading,
    StyleMainBox,
    StyleMenu,
    StyleNavButton,
    StyleProfileBox,
} from './Navbar.Container.Style';

export const NavbarContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const currentPath = location.pathname;

    const user = useAppSelector((state) => state.user.userDetails);
    const profileUrl = PROFILE_PAGE_URL + user?.login;

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null,
    );

    const handleLogout = () => {
        dispatch(logout());
        void navigate(LOGIN_PAGE_URL);
    };

    const handleNavigation = (path: NavigationPath) => {
        if (user && path === '/profile/') {
            void navigate(profileUrl);
        } else {
            void navigate(path);
        }
    };

    const handleUserMenu = (event: React.MouseEvent<HTMLElement> | null) => {
        if (event) {
            setAnchorElUser(event.currentTarget);
        } else {
            setAnchorElUser(null);
        }
    };

    return (
        <StyleAppBar>
            <StyleMainBox>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <StyleLinkContainerBox to="/">
                            <StyleLinkBox>
                                <StyleGitHubIcon />
                                <StyleLogoHeading>
                                    <Typography component="h3" variant="h5">
                                        Get GIT
                                    </Typography>
                                </StyleLogoHeading>
                            </StyleLinkBox>
                        </StyleLinkContainerBox>

                        <StyleButtonBox>
                            {currentPath !== SEARCH_PAGE_URL &&
                                currentPath !== HOME_PAGE_URL && (
                                    <StyleNavButton
                                        key="Search"
                                        onClick={() =>
                                            handleNavigation('/search')
                                        }
                                        variant="contained"
                                    >
                                        Search
                                    </StyleNavButton>
                                )}
                            {currentPath !== profileUrl && user && (
                                <StyleNavButton
                                    key="Profile"
                                    onClick={() =>
                                        handleNavigation('/profile/')
                                    }
                                    variant="contained"
                                >
                                    Profile
                                </StyleNavButton>
                            )}
                        </StyleButtonBox>

                        {user ? (
                            <StyleProfileBox>
                                <Tooltip title="Open Profile">
                                    <IconButton onClick={handleUserMenu}>
                                        <Avatar
                                            alt={user?.login}
                                            src={user?.avatar_url}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <StyleMenu
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    open={Boolean(anchorElUser)}
                                    onClose={() => handleUserMenu(null)}
                                    disableScrollLock
                                >
                                    <MenuItem
                                        key="Profile"
                                        onClick={() =>
                                            handleNavigation('/profile/')
                                        }
                                    >
                                        <Typography>Profile</Typography>
                                    </MenuItem>
                                    <MenuItem
                                        key="Logout"
                                        onClick={handleLogout}
                                    >
                                        <Typography>Logout</Typography>
                                    </MenuItem>
                                </StyleMenu>
                            </StyleProfileBox>
                        ) : (
                            <StyleNavButton
                                variant="contained"
                                onClick={() => handleNavigation('/login')}
                            >
                                Login
                            </StyleNavButton>
                        )}
                    </Toolbar>
                </Container>
            </StyleMainBox>
        </StyleAppBar>
    );
};
