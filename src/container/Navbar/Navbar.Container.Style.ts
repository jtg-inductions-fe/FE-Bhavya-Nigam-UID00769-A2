import { Link } from 'react-router-dom';

import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyleGitHubIcon = styled(GitHubIcon)(({ theme }) => ({
    fontSize: theme.spacing(10),
}));

export const StyleAppBar = styled(AppBar)(() => ({
    position: 'static',
}));

export const StyleMainBox = styled(Box)(({ theme }) => ({
    position: 'static',
    color: theme.palette.primary.main,
    background: theme.palette.secondary.main,
}));

export const StyleLinkContainerBox = styled(Link)(() => ({
    color: 'inherit',
    textDecoration: 'none',
}));

export const StyleButtonBox = styled(Box)(({ theme }) => ({
    gap: theme.spacing(2.5),
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'end',
    marginRight: theme.spacing(2.5),
}));

export const StyleLinkBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2.5),
}));

export const StyleProfileBox = styled(Box)(() => ({
    display: 'flex',
}));
