import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyleContainerBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}));

export const StyleMainContainerBox = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing(10),
    paddingTop: spacing(25),
    textAlign: 'center',
}));

export const StyleImgBox = styled('img')(({ theme: { spacing } }) => ({
    borderRadius: spacing(2.5),
    width: spacing(32.5),
    height: spacing(32.5),

    boxShadow: '0 0 12px 0.5px rgba(1,1,1,0.5)',
}));

export const StyleTopDetailBox = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(1),
}));

export const StyleLocationDetailBox = styled(Box)(({ theme: { palette } }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    color: palette.primary.dark,
}));

export const StyleFollowDetailsBox = styled(Box)(
    ({ theme: { spacing, palette } }) => ({
        display: 'flex',
        justifyContent: 'center',
        gap: spacing(5),
        paddingTop: spacing(2.5),
        paddingBottom: spacing(2.5),
        width: '100vw',
        background: palette.background.paper,
    }),
);

export const StyleMidLine = styled(Box)(({ theme: { spacing } }) => ({
    height: spacing(12.5),
    boxShadow: '0 0 1px 0.5px rgba(1,1,1,0.5)',
}));

export const StyleBioBox = styled(Box)(({ theme: { spacing, palette } }) => ({
    marginTop: spacing(10),
    marginBottom: spacing(10),
    paddingTop: spacing(10),
    paddingLeft: spacing(2.5),
    paddingBottom: spacing(10),
    border: `${spacing(1)} solid ${palette.background.paper}`,
    width: '100vw',
}));

export const StyleMoreDetailsBox = styled(Box)(({ theme: { spacing } }) => ({
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(2.5),
    marginTop: spacing(2.5),
}));

export const StyleMoreDetailBox = styled(Box)(
    ({ theme: { spacing, palette } }) => ({
        backgroundColor: palette.background.paper,
        display: 'flex',
        paddingTop: spacing(2.5),
        paddingBottom: spacing(2.5),
        paddingLeft: spacing(3.75),
        cursor: 'pointer',
        alignItems: 'center',
        gap: spacing(2.5),
        color: palette.primary.main,
        textDecoration: 'none',
    }),
);

export const StyleVisitButtonBox = styled(Box)(({ theme: { spacing } }) => ({
    width: '100vw',
    marginTop: spacing(5),
}));

export const StyleVisitButton = styled(Button)(({ theme: { spacing } }) => ({
    display: 'flex',
    gap: spacing(2.5),
    width: '100vw',
}));

export const StyleLinkContainerBox = styled('a')(() => ({
    color: 'inherit',
    textDecoration: 'none',
}));

export const StyleButton = styled(Button)(({ theme: { spacing } }) => ({
    width: '100vw',
    marginTop: spacing(2.5),
}));
