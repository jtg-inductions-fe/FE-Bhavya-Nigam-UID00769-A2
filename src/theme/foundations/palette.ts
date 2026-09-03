import type { PaletteOptions } from '@mui/material/styles';

import { COLORS } from '@constant';

/* Custom Palette */
export const palette: PaletteOptions = {
    primary: {
        main: COLORS.PRIMARY.PRIMARY,
        dark: COLORS.PRIMARY.DARK,
    },
    secondary: {
        main: COLORS.PRIMARY.SECONDARY,
        dark: COLORS.PRIMARY.BLACK,
    },

    background: {
        paper: COLORS.PRIMARY.TERTIARY,
    },

    text: {
        secondary: COLORS.PRIMARY.GRAY,
        primary: COLORS.PRIMARY.BACKGROUND,
    },
};
