import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { onSignIn } from "./auth";

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
window.onSignIn = onSignIn;
