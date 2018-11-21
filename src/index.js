import React from 'react';
import ReactDOM from 'react-dom';
import 'handsontable/dist/handsontable.full.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppContainer } from 'react-hot-loader';

const render = () => {
  ReactDOM.render(
    // Wrap App inside AppContainer
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('cs-gen-root')
  );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

render();

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render();
  });
}
