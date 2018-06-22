import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import store from './store';
import './index.scss';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

require('dotenv').config()

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>, 
    document.getElementById('root'));
    
registerServiceWorker();
