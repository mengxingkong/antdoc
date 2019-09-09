import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Life from './pages/demo/life.js'
import Admin from './admin.js'
// import Home from './pages//router-demo/router2/home'
import IRoute from './pages/router-demo/router3/router'
import IRouter from './router'
import {Provider} from 'react-redux'
import configStore from './redux/store/configStore'
import * as serviceWorker from './serviceWorker';
const store = configStore();
ReactDOM.render(
    <Provider store={store}>
        <IRouter />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
