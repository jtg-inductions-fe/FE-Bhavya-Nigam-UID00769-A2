import { Link } from 'react-router-dom';

import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyleContainerBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}));

export const StyleMainContainerBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(10),
    paddingTop: theme.spacing(25),
    textAlign: 'center',
}));

export const StyleImgBox = styled('img')(({ theme }) => ({
    borderRadius: theme.spacing(2.5),
    width: theme.spacing(32.5),
    height: theme.spacing(32.5),

    boxShadow: '0 0 12px 0.5px rgba(1,1,1,0.5)',
}));

export const StyleTopDetailBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
}));

export const StyleLocationDetailBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    color: theme.palette.primary.dark,
}));

export const StyleFollowDetailsBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(5),
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    width: '100vw',
    background: theme.palette.background.paper,
}));

export const StyleMidLine = styled(Box)(({ theme }) => ({
    height: theme.spacing(12.5),
    boxShadow: '0 0 1px 0.5px rgba(1,1,1,0.5)',
}));

export const StyleBioBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    paddingTop: theme.spacing(10),
    paddingLeft: theme.spacing(2.5),
    paddingBottom: theme.spacing(10),
    border: theme.spacing(1),
    borderStyle: 'solid',
    width: '100vw',
    borderColor: theme.palette.background.paper,
}));

export const StyleMoreDetailsBox = styled(Box)(({ theme }) => ({
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2.5),
    marginTop: theme.spacing(2.5),
}));

export const StyleMoreDetailBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    paddingLeft: theme.spacing(3.75),
    cursor: 'pointer',
    alignItems: 'center',
    gap: theme.spacing(2.5),
    color: theme.palette.primary.main,
    textDecoration: 'none',
}));

export const StyleVisitButtonBox = styled(Box)(({ theme }) => ({
    width: '100vw',
    marginTop: theme.spacing(5),
}));

export const StyleVisitButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2.5),
    width: '100vw',
}));

export const StyleLinkContainerBox = styled(Link)(() => ({
    color: 'inherit',
    textDecoration: 'none',
}));

export const StyleButton = styled(Button)(({ theme }) => ({
    width: '100vw',
    marginTop: theme.spacing(2.5),
}));
