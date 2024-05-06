import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./css/reset.css"; //引入重置css

import "antd/dist/antd.min.js"; //antd样式
import zhCN from "antd/es/locale/zh_CN"; //antd中文语言包
import { ConfigProvider } from "antd"; //引入设置
import { BrowserRouter } from "react-router-dom"; // history模式的router

import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);
