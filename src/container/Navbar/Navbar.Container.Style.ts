import { Link } from 'react-router-dom';

import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyleGitHubIcon = styled(GitHubIcon)(({ theme: { spacing } }) => ({
    fontSize: spacing(9),
}));

export const StyleAppBar = styled(AppBar)(({ theme: { spacing } }) => ({
    position: 'static',
    minWidth: spacing(80),
}));

export const StyleMainBox = styled(Box)(({ theme: { palette } }) => ({
    position: 'static',
    color: palette.secondary.main,
    background: palette.secondary.dark,
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

export const StyleLogoHeading = styled(Box)(() => ({
    fontWeight: 900,
    textTransform: 'uppercase',
}));

export const StyleProfileBox = styled(Box)(() => ({
    display: 'flex',
}));

export const StyleNavButton = styled(Button)(({ theme: { palette } }) => ({
    background: palette.secondary.main,
    color: palette.secondary.dark,
}));
