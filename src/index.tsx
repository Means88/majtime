import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import Desk from './common/containers/Desk';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Desk initialTime={{ maintime: 8, overtime: 20 }} />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
