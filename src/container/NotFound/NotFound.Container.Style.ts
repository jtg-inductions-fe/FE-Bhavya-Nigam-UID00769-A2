import { Box, Button, styled } from '@mui/material';

import BackgroundNotFoundImg from '@assets/images/BackgroundNotFoundImg.webp';

export const StyleMainBox = styled(Box)(({ theme: { palette } }) => ({
    display: 'flex',
    flexDirection: 'column',

    background: palette.primary.main,
    height: '100%',
    alignItems: 'center',
}));

export const StyleContainer = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${BackgroundNotFoundImg})`,
    backgroundSize: 'cover',

    padding: `${spacing(10)} 0`,
    width: '100%',
}));

export const StyleMessageBox = styled(Box)(
    ({ theme: { spacing, palette, typography } }) => ({
        color: palette.secondary.main,
        fontSize: typography.pxToRem(20),
        backgroundColor: palette.primary.dark,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: `${spacing(10)} 0`,
    }),
);

export const StyleButton = styled(Button)(
    ({ theme: { palette, spacing } }) => ({
        background: palette.secondary.main,
        marginLeft: spacing(4),
        color: palette.primary.main,
    }),
);
