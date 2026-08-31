import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { Box, styled } from '@mui/material';

export const StyleContainerBox = styled(Box)(({ theme: { palette } }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '89vh',
    backgroundColor: palette.text.primary,
}));

export const StyleMessageBox = styled(Box)(
    ({ theme: { spacing, palette } }) => ({
        backgroundColor: palette.background.paper,
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
    ({ theme: { spacing } }) => ({
        fontSize: spacing(10),
    }),
);
