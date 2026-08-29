import type { Components } from '@mui/material/styles';

// Local Font files
import GeistRegularTTF from '@assets/fonts/Geist/Geist-Regular.ttf';
import GeistRegularWOFF2 from '@assets/fonts/Geist/Geist-Regular.woff2';

const fontFaceDeclarations = `
       @font-face {
        font-display: swap; 
        font-family: 'Geist';
        font-style: normal;
        font-weight: 500;
        src: url(${GeistRegularWOFF2}) format('woff2'), 
        url(${GeistRegularTTF}) format('truetype');
      };
    `;

export const components: Components = {
    MuiCssBaseline: {
        styleOverrides: {
            html: {
                fontSize: '62.5%',
            },
            fontFaceDeclarations,
        },
    },
};
