import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import {state, addVideo} from './websocket.js';

ReactDOM.render(
  <App {...state}/>,
  document.getElementById('root')
);

addVideo('Bag1gUxuU0g');
setTimeout(function() {
  ReactDOM.render(
    <App {...state}/>,
    document.getElementById('root')
  );
}, 1000);

