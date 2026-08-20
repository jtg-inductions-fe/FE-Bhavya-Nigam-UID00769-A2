import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
});

export const StyleMainBox = styled(Box)(({ theme }) => ({
    background: theme.palette.background.paper,
    padding: theme.typography.pxToRem(50),
    borderRadius: theme.typography.pxToRem(20),
}));

export const StyledIconBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.typography.pxToRem(10),
}));

export const StyledFormBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.typography.pxToRem(20),
    marginTop: theme.typography.pxToRem(20),
}));
