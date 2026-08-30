import { CircularProgress, styled } from '@mui/material';
import Box from '@mui/material/Box';

export const StyleContainer = styled(Box)(({ theme: { palette } }) => ({
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: palette.secondary.dark,
}));

export const StyleLoader = styled(CircularProgress)(
    ({ theme: { palette } }) => ({
        position: 'relative',
        color: palette.secondary.main,
        top: '50%',
        left: '50%',
    }),
);
