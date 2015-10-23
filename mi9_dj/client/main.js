import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import appState from './state';
import {addVideo} from './websocket';

let priorState = {
  playlist: [],
  searchResults: [],
}

function renderPage(state) {
  const newState = {
    ...priorState,
    ...state,
  };
  priorState = newState;
  ReactDOM.render(
    <App {...newState}/>,
    document.getElementById('root')
  );
}
appState.callback = renderPage;

appState.setState(priorState);
