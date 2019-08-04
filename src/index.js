import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router } from 'react-router-dom';
require('dotenv').config();


ReactDOM.render((
<Router>
    <App />
</Router>
), document.getElementById('root'));
serviceWorker.unregister();
