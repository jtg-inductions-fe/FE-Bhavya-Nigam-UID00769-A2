import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, styled } from '@mui/material';

export const StyleContainer = styled(Box)(() => ({}));

export const StyleHeading = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    justifyContent: 'center',
    padding: spacing(0, 4),
    gap: spacing(20),
}));

export const StyleMainBox = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(4),
    padding: spacing(4),
}));
export const StyleRefreshBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'flex-end',
}));

export const StyleRefreshButton = styled(Button)(() => ({
    '&:hover': {
        opacity: '50%',
    },
}));

export const StyleProfiles = styled(Box)(
    ({ theme: { spacing, breakpoints } }) => ({
        display: 'flex',
        justifyContent: 'space-around',
        gap: spacing(4),
        flexDirection: 'column',
        [breakpoints.down('lg')]: {
            flexDirection: 'row',
        },
    }),
);

export const StyleProfile = styled(Box)(({ theme: { spacing, palette } }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(2),
    alignItems: 'center',
    boxShadow: `0 0 0 0.2px ${palette.primary.main}`,
    padding: spacing(4),
    width: '100%',
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
export const StyleFollowButton = styled(Button)(
    ({ theme: { palette, typography } }) => ({
        background: palette.secondary.dark,
        color: palette.secondary.main,
        fontSize: typography.pxToRem(12),
        width: '100%',
        '&:hover': {
            opacity: '50%',
        },
    }),
);

export const StyleLoaderContainer = styled(Box)(() => ({
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
}));
