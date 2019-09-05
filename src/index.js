import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { SnackbarProvider } from 'notistack';
import reducers from './reducers';
import App from './components/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../style/style.css';


const createStoreWithMiddleware = applyMiddleware(promise, ReduxPromise, ReduxThunk)(createStore)

const store = createStoreWithMiddleware(reducers());

const Jsx = () => (
    <Provider store={store}>
        <SnackbarProvider
            maxSnack={5}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
        >
            <App/>
        </SnackbarProvider>
    </Provider>
);

ReactDOM.render(<Jsx />, document.querySelector('.root'));