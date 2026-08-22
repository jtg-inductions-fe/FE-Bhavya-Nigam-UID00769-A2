import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import GitHubIcon from '@mui/icons-material/GitHub';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { logout } from '@features/userSlice';
import { RootState } from '@store/store';

import {
    StyleButtonBox,
    StyleLinkBox,
    StyleMainBox,
    StyleMenuBox,
} from './Navbar.Container.Style';

export const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentPath = window.location.pathname;

    const user = useSelector((state: RootState) => state.user.user);

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null,
    );

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleSearch = () => {
        void navigate('/search');
    };

    const handleProfile = () => {
        void navigate('/profile');
    };

    const handleLogout = () => {
        dispatch(logout());
        void navigate('/login');
    };
    const handleLogin = () => {
        void navigate('/login');
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <StyleMainBox>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link href="/" underline="none">
                            <StyleLinkBox>
                                <GitHubIcon />
                                <Typography variant="h5" component="h3" noWrap>
                                    Get GIT
                                </Typography>
                            </StyleLinkBox>
                        </Link>

                        <StyleButtonBox>
                            {currentPath === '/profile' ? (
                                <Button
                                    key="Search"
                                    onClick={handleSearch}
                                    variant="contained"
                                >
                                    Search
                                </Button>
                            ) : (
                                <Button
                                    key="Profile"
                                    onClick={handleProfile}
                                    variant="contained"
                                >
                                    Profile
                                </Button>
                            )}
                        </StyleButtonBox>

                        {user ? (
                            <Box>
                                <Tooltip title="Open Profile">
                                    <IconButton onClick={handleOpenUserMenu}>
                                        <Avatar
                                            alt={user?.login}
                                            src={user?.avatar_url}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <StyleMenuBox>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem
                                            key="Profile"
                                            onClick={handleProfile}
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
                                </StyleMenuBox>
                            </Box>
                        ) : (
                            <Button variant="contained" onClick={handleLogin}>
                                Login
                            </Button>
                        )}
                    </Toolbar>
                </Container>
            </StyleMainBox>
        </AppBar>
    );
};
