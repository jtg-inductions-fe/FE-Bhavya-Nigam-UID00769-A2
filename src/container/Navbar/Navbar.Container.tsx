import * as React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
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
import { NavigationPath } from '@type/NavigationPath.Types';

import {
    StyleAppBar,
    StyleButtonBox,
    StyleGitHubIcon,
    StyleLinkBox,
    StyleLinkContainerBox,
    StyleMainBox,
    StyleProfileBox,
} from './Navbar.Container.Style';

export const NavbarContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const currentPath = location.pathname;

    const user = useAppSelector((state) => state.user.userDetails);

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null,
    );

    const handleLogout = () => {
        dispatch(logout());
        void navigate(LOGIN_PAGE_URL);
    };

    const handleNavigation = (path: NavigationPath) => {
        void navigate(path);
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
                                <Typography variant="h5" component="h3" noWrap>
                                    Get GIT
                                </Typography>
                            </StyleLinkBox>
                        </StyleLinkContainerBox>

                        <StyleButtonBox>
                            {currentPath !== SEARCH_PAGE_URL &&
                                currentPath !== HOME_PAGE_URL && (
                                    <Button
                                        key="Search"
                                        onClick={() =>
                                            handleNavigation('/search')
                                        }
                                        variant="contained"
                                    >
                                        Search
                                    </Button>
                                )}
                            {currentPath !== PROFILE_PAGE_URL && user && (
                                <Button
                                    key="Profile"
                                    onClick={() =>
                                        handleNavigation('/profile/')
                                    }
                                    variant="contained"
                                >
                                    Profile
                                </Button>
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
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    open={Boolean(anchorElUser)}
                                    onClose={() => handleUserMenu(null)}
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
                                </Menu>
                            </StyleProfileBox>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={() => handleNavigation('/login')}
                            >
                                Login
                            </Button>
                        )}
                    </Toolbar>
                </Container>
            </StyleMainBox>
        </StyleAppBar>
    );
};
