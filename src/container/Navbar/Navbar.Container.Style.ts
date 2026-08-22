import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyleMainBox = styled(Box)(({ theme }) => ({
    position: 'static',
    color: theme.palette.primary.main,
    background: theme.palette.secondary.main,
}));

export const StyleButtonBox = styled(Box)(() => ({
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'end',
    marginRight: 10,
}));

export const StyleLinkBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
}));

export const StyleMenuBox = styled(Box)(() => ({
    marginTop: '10px',
}));
