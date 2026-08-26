import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { Box, styled } from '@mui/material';

export const StyleContainerBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
}));

export const StyleMessageBox = styled(Box)(
    ({ theme: { spacing, palette } }) => ({
        backgroundColor: palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing(8),
        padding: spacing(10),
    }),
);

export const StyleSadIcon = styled(SentimentDissatisfiedIcon)(
    ({ theme: { spacing } }) => ({
        fontSize: spacing(10),
    }),
);
