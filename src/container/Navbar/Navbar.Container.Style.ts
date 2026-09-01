import { Link } from 'react-router-dom';

import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyleGitHubIcon = styled(GitHubIcon)(({ theme: { spacing } }) => ({
    fontSize: spacing(10),
}));

export const StyleAppBar = styled(AppBar)(() => ({
    position: 'static',
    minWidth: '320px',
}));

export const StyleMainBox = styled(Box)(({ theme: { palette } }) => ({
    position: 'static',
    color: palette.primary.main,
    background: palette.secondary.main,
}));

export const StyleLinkContainerBox = styled(Link)(() => ({
    color: 'inherit',
    textDecoration: 'none',
}));

export const StyleButtonBox = styled(Box)(({ theme: { spacing } }) => ({
    gap: spacing(2.5),
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'end',
    marginRight: spacing(2.5),
}));

export const StyleLinkBox = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing(2.5),
}));

export const StyleProfileBox = styled(Box)(() => ({
    display: 'flex',
}));
