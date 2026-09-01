import {
    Box,
    Button,
    CircularProgress,
    List,
    ListItem,
    styled,
    TextField,
} from '@mui/material';

export const StyleContainerBox = styled(Box)(
    ({ theme: { spacing, palette } }) => ({
        display: 'flex',
        height: '94vh',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: spacing(20),
        backgroundColor: palette.text.primary,

        color: palette.secondary.main,
    }),
);

export const StyleTopBox = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing(4),
    marginBottom: spacing(10),
}));

export const StyleTextFieldBox = styled(TextField)(
    ({ theme: { palette, spacing, breakpoints } }) => ({
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                boxShadow: `0 0 0 1px ${palette.background.paper}`,
                borderRadius: spacing(2.5),
            },
        },
        '& .MuiInputBase-input': {
            color: palette.secondary.main,
        },

        '& .MuiInputBase-input::placeholder': {
            color: palette.text.secondary,
            opacity: 1,
        },

        '& .MuiInputBase-input::': {
            background: 'inherit',
            opacity: 1,
        },

        marginBottom: spacing(6),
        width: spacing(100),

        [breakpoints.down('sm')]: {
            width: spacing(75),
        },
    }),
);

export const StyleBottomBox = styled(Box)(
    ({ theme: { spacing, palette } }) => ({
        height: spacing(100),
        overflowY: 'scroll',
        border: `1px solid ${palette.primary.main}`,
        borderRadius: spacing(4),
        scrollbarWidth: 'none',
        width: '100%',
        maxWidth: spacing(120),
        boxSizing: 'border-box',
    }),
);

export const StyleListBox = styled(List)(({ theme: { palette } }) => ({
    backgroundColor: palette.text.primary,
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
    background: palette.secondary.main,
    color: palette.secondary.dark,
}));

export const StyleTextSpan = styled('span')(({ theme: { breakpoints } }) => ({
    [breakpoints.down('sm')]: {
        display: 'none',
    },
}));

export const StyleSubHeading = styled(Box)(({ theme: { spacing } }) => ({
    marginLeft: spacing(4),
    marginRight: spacing(4),
}));

export const StyleLoader = styled(CircularProgress)(
    ({ theme: { palette } }) => ({
        position: 'relative',
        color: palette.secondary.main,
        top: '40%',
        left: '44%',
    }),
);

export const StyleNotFoundBox = styled(Box)(({ theme: { palette } }) => ({
    display: 'flex',
    justifyContent: 'center',
    color: palette.text.secondary,
}));
