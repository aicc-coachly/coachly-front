import React from 'react';
import ReactDOM from 'react-dom/client'; // createRoot를 위해 react-dom/client에서 불러오기
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './assets/styles/styles.css';

// createRoot를 사용하여 root 생성 및 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
