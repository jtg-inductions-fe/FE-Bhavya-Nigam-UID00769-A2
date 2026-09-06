import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, CircularProgress, styled } from '@mui/material';

export const StyleContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export const StyleHeading = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
}));

export const StyleMainBox = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(4),
}));
export const StyleRefreshBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'flex-end',
}));

export const StyleRefreshButton = styled(Button)(({ theme: { palette } }) => ({
    background: palette.secondary.main,

    '&:hover': {
        opacity: '50%',
    },
}));

export const StyleProfiles = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    gap: spacing(4),
}));

export const StyleProfile = styled(Box)(({ theme: { spacing, palette } }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(4),
    alignItems: 'center',
    boxShadow: `0 0 0 1px ${palette.primary.main}`,
    padding: spacing(4),
    width: '40%',
    borderRadius: spacing(4),
}));

export const StyleProfileTop = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    gap: spacing(4),
    width: '100%',
    justifyContent: 'space-between',
}));

export const StyleLeftPart = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    gap: spacing(2),

    cursor: 'pointer',
    '&:hover': {
        opacity: '50%',
    },
}));
export const StyleUsername = styled(Box)(({ theme: { palette } }) => ({
    color: palette.text.secondary,
}));
export const StyleCloseButton = styled(CloseIcon)(() => ({
    cursor: 'pointer',
    '&:hover': {
        opacity: '50%',
    },
}));

export const StyleProfileBottom = styled(Box)(() => ({
    width: '100%',
}));
export const StyleFollowButton = styled(Button)(({ theme: { palette } }) => ({
    background: palette.secondary.main,
    width: '100%',
    '&:hover': {
        opacity: '50%',
    },
}));

export const StyleLoaderContainer = styled(Box)(() => ({
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
}));
export const StyleLoader = styled(CircularProgress)(
    ({ theme: { palette } }) => ({
        color: palette.secondary.main,
    }),
);
