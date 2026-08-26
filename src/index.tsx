import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from 'App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SessionRefresh } from 'services/refreshService';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { store } from '@store/store';
import { theme } from '@theme';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <BrowserRouter>
                    <SessionRefresh />
                    <App />
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    </StrictMode>,
);
