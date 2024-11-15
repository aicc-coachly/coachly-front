import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // App 컴포넌트 경로 확인
import store, { persistor } from "./redux/store"; // store 및 persistor 가져오기
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import "./assets/styles/styles.css"; // Tailwind 및 전역 스타일 설정

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
  </Provider>
);
