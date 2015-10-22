import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import appState from './state';
import {addVideo} from './websocket';

function renderPage(state) {
  ReactDOM.render(
    <App {...state}/>,
    document.getElementById('root')
  );
}
appState.callback = renderPage;

appState.setState({});
