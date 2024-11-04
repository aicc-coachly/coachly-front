import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // App 컴포넌트 경로 확인
import store from './redux/Store'; // store 설정 파일 경로
import { Provider } from 'react-redux';

import './assets/styles/styles.css'; // Tailwind 및 전역 스타일 설정

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
