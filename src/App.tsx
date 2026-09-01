import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { RoutePath } from '@routes/RoutePath';
import { SessionRefresh } from '@services/Refresh.Service';
import { store } from '@store/store';

import './theme/index';

export const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <SessionRefresh />
            <RoutePath />
        </BrowserRouter>
    </Provider>
);
