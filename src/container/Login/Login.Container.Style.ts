import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
});

export const StyleMainBox = styled(Box)(({ theme: { palette, spacing } }) => ({
    background: palette.background.paper,
    padding: spacing(12.5),
    borderRadius: spacing(5),
}));

export const StyledIconBox = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing(2.5),
}));

export const StyledFormBox = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(5),
    marginTop: spacing(5),
}));
