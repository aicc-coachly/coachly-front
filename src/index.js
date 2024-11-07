// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Provider 추가
import store from './redux/store'; // store 추가
import App from './App';
import './assets/styles/styles.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {' '}
      {/* Provider로 전체 애플리케이션 감싸기 */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
