import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from 'App';
import { Provider } from 'react-redux';
import { SessionRefresh } from 'services/refreshService';
<<<<<<< HEAD
=======
import { store } from 'store/store';
>>>>>>> 22dcdef ([BN_A2_01]: Login Page)

import { CssBaseline, ThemeProvider } from '@mui/material';

import { store } from '@store/store';
import { theme } from '@theme';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <SessionRefresh />
                <App />
            </Provider>
        </ThemeProvider>
    </StrictMode>,
);
