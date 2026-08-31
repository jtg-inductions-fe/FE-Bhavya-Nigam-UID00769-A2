import { Box, Button, List, ListItem, styled, TextField } from '@mui/material';

export const StyleContainerBox = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    height: '90vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: spacing(80),
}));

export const StyleTopBox = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing(10),
    marginBottom: spacing(10),
}));

export const StyleInputField = styled(TextField)(
    ({ theme: { spacing, breakpoints } }) => ({
        width: spacing(100),

        [breakpoints.down('sm')]: {
            width: spacing(75),
        },
    }),
);

export const StyleBottomBox = styled(Box)(
    ({ theme: { spacing, palette } }) => ({
        maxHeight: spacing(100),
        overflowY: 'scroll',
        border: `1px solid ${palette.primary.main}`,
    }),
);

export const StyleListBox = styled(List)(({ theme: { palette } }) => ({
    backgroundColor: palette.secondary.main,
}));

export const StyleListItemBox = styled(ListItem)(
    ({ theme: { spacing, palette, breakpoints } }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        gap: spacing(20),
        borderBottom: `1px solid ${palette.background.paper}`,

        [breakpoints.down('sm')]: {
            gap: spacing(0.5),
        },
    }),
);

export const StyleLeftPart = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}));

export const StyleButton = styled(Button)(({ theme: { palette } }) => ({
    textTransform: 'initial',
    color: palette.secondary.main,
}));

export const StyleTextSpan = styled('span')(({ theme: { breakpoints } }) => ({
    [breakpoints.down('sm')]: {
        display: 'none',
    },
}));
