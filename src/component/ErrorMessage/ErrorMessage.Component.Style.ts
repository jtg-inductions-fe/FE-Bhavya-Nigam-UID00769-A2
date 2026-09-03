import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { Box, styled } from '@mui/material';

export const StyleContainerBox = styled(Box)(({ theme: { palette } }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.secondary.main,
}));

export const StyleMessageBox = styled(Box)(
    ({ theme: { spacing, palette } }) => ({
        backgroundColor: palette.text.secondary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing(8),
        color: palette.secondary.main,
        padding: spacing(10),
    }),
);

export const StyleSadIcon = styled(SentimentDissatisfiedIcon)(
    ({ theme: { typography } }) => ({
        fontSize: typography.pxToRem(40),
    }),
);
