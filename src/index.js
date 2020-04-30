import React from 'react';
import ReactDOM from 'react-dom';
import GA from 'react-ga';

import App from './App';
import * as serviceWorker from './serviceWorker';

GA.initialize("UA-165041784-1");

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
