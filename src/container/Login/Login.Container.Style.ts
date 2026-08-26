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
    padding: theme.spacing(12.5),
    borderRadius: theme.spacing(5),
}));

export const StyledIconBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(2.5),
}));

export const StyledFormBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),
    marginTop: theme.spacing(5),
}));
