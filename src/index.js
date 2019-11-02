import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store'
import App from './App';
// import 'antd/dist/antd.css';
import 'normalize.css/normalize.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
