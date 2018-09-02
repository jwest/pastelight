import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import reducer from './reducer';
import { middleware, registerTasksSync } from './redux-tasks';
import { importStartRequest } from '../importer/actions/import';

const store = createStore(
  reducer,
  window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__'](), // eslint-disable-line
  applyMiddleware(middleware),
);

registerTasksSync();

setTimeout(
  () => store.dispatch(importStartRequest('/some/test/path')),
  1000,
);

function render() {
  const App = require('./components/App').default; // eslint-disable-line global-require

  ReactDOM.render(
    <AppContainer>
      <App store={store} />
    </AppContainer>,
    document.getElementById('root'),
  );
}

export { render };

// TODO: Logging
