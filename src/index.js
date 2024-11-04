import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // App 컴포넌트 경로 확인
import './assets/styles/styles.css'; // Tailwind 및 전역 스타일 설정

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
