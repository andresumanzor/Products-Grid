import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { MuiThemeProvider } from '@material-ui/core/styles';
import reducers from './reducers';
import App from './components/app';
import theme from './themes/general';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../style/style.css';


const createStoreWithMiddleware = applyMiddleware(promise, ReduxPromise, ReduxThunk)(createStore)

const store = createStoreWithMiddleware(reducers());

const Jsx = () => (
    <Provider store={store}>
       <MuiThemeProvider theme={theme}>
            <App/>
       </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(<Jsx />, document.querySelector('.root'));