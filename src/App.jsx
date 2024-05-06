import React, { useState } from "react";
import "./css/App.css";
import "./css/app.antd.css";

import RouterConfig from "./router/index.jsx";

import { Layout } from "antd"; //antd布局组件
import LogoBox from "./components/LogoBox"; //引入组件
import Navigator from "./components/Navigator";
import SearchBar from "./components/SearchBar";
import LoginButton from "./components/LoginButton";
import PageFooter from "./components/PageFooter";
import LoginForm from "./components/LoginForm";

const { Header, Footer, Content } = Layout;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //处理登录注册
  function loginHandle() {
    setIsModalOpen(true); // 打开弹框
    console.log("处理登录注册");
  }

  // 关闭弹框
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="appContainer">
      <Header className="header">
        <LogoBox></LogoBox>
        <Navigator></Navigator>
        <SearchBar></SearchBar>
        <LoginButton loginHandle={loginHandle}></LoginButton>
      </Header>
      <Content>
        <RouterConfig></RouterConfig>
      </Content>
      <Footer>
        <PageFooter></PageFooter>
      </Footer>
      <LoginForm isShow={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default App;
