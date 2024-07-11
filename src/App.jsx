import React, { useState, useEffect } from "react";
import "./css/App.css";
import "./css/app.antd.css";

import RouterConfig from "./router/index.jsx";

import { Layout, message } from "antd"; //antd布局组件
import LogoBox from "./components/LogoBox"; //引入组件
import Navigator from "./components/Navigator";
import SearchBar from "./components/SearchBar";
import LoginButton from "./components/LoginButton";
import PageFooter from "./components/PageFooter";
import LoginForm from "./components/LoginForm";

import { refreshUser, getUserInfoById } from "./api/user";

import { initUserInfo, changeLoginStatus } from "./redux/userSlice";
import { useDispatch } from "react-redux";

const { Header, Footer, Content } = Layout;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // 首先判断 localstorage 中是否有 token
    const token = localStorage.getItem("token");
    if (!token) return; // 没有 token 跳过
    // 有 token 恢复登录 , 需要在 请求拦截 中加入 请求头 authorization
    async function refresh() {
      const result = await refreshUser();
      // console.log("refresh ====", result);

      if (!result.data) {
        // 如果 token过期了 要重新登录,移除 localstorage
        localStorage.removeItem("token");
        message.error(result.msg);
      } else {
        // 如果没有过期，就重新获取 userInfo 并存入到状态仓库
        const { data } = await getUserInfoById(result.data._id);
        // console.log("userInfo ====", data);
        dispatch(initUserInfo(data));
        dispatch(changeLoginStatus(true));
      }
    }
    refresh();
  }, []);

  //处理登录注册
  function loginHandle() {
    setIsModalOpen(true); // 打开弹框
  }

  // 关闭弹框
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="appContainer">
      <Header className="header">
        <div className="headerContainer">
          <LogoBox></LogoBox>
          <Navigator></Navigator>
          <SearchBar></SearchBar>
          <LoginButton loginHandle={loginHandle}></LoginButton>
        </div>
      </Header>
      <Content className="content">
        <RouterConfig></RouterConfig>
      </Content>
      <Footer className="footer">
        <PageFooter></PageFooter>
      </Footer>
      <LoginForm isShow={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default App;
