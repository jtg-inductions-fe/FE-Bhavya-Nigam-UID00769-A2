import { Link } from 'react-router-dom';

import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledBox = styled(Box)(({ theme: { palette } }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: palette.secondary.dark,
}));

export const StyleMainBox = styled(Box)(({ theme: { palette, spacing } }) => ({
    backgroundColor: palette.text.primary,
    padding: spacing(10),
    borderRadius: spacing(5),
    boxShadow: `0 0 0 2px ${palette.background.paper}`,
    margin: spacing(6),
    color: palette.secondary.main,
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
    marginTop: spacing(5),
}));

export const StyleTextBox = styled(Typography)(
    ({ theme: { palette, typography } }) => ({
        color: palette.text.secondary,
        fontSize: typography.pxToRem(14),
    }),
);

export const StyleTextFieldBox = styled(TextField)(
    ({ theme: { palette, spacing } }) => ({
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                boxShadow: `0 0 0 1px ${palette.background.paper}`,
                borderRadius: spacing(2.5),
            },
        },
        '& .MuiInputBase-input': {
            color: palette.secondary.main,
            padding: spacing(1, 3),
        },

        '& .MuiInputBase-input::placeholder': {
            color: palette.text.secondary,
            opacity: 1,
        },

        marginBottom: spacing(6),
    }),
);

export const StyleLoginButton = styled(Button)(
    ({ theme: { palette, spacing } }) => ({
        backgroundColor: palette.secondary.light,
        borderRadius: spacing(2),
        color: palette.secondary.dark,
        marginBottom: spacing(4),
    }),
);

export const StyleLabel = styled('label')(
    ({ theme: { spacing, typography } }) => ({
        fontSize: typography.pxToRem(14),
        marginBottom: spacing(3),
        fontWeight: 700,
    }),
);

export const StyleLink = styled(Link)(() => ({
    color: 'inherit',
}));
