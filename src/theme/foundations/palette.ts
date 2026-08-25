import type { PaletteOptions } from '@mui/material/styles';

import { COLORS } from '@constant';

/* Custom Palette */
export const palette: PaletteOptions = {
    primary: {
        main: COLORS.PRIMARY.PRIMARY,
    },
    secondary: {
        main: COLORS.PRIMARY.SECONDARY,
    },

    background: { paper: COLORS.PRIMARY.TERTIARY },
};
