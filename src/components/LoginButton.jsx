import React from "react";

import { useSelector } from "react-redux";

import { Button, List, Popover, Avatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons"; // icon引入

import styles from "../css/LoginButton.module.css"; // css模块化引入

// 该组件用于显示用户的头像，如果用户没有登录，那么就显示登录注册按钮
function LoginButton(props) {
  const { isLogin, userInfo } = useSelector((state) => state.user);

  let loginStatus = null;
  if (isLogin) {
    // 登录了
    const content = (
      <List
        dataSource={["个人中心", "退出登录"]}
        size="large"
        renderItem={(item) => {
          return <List.Item style={{ cursor: "pointer" }}>{item}</List.Item>;
        }}
      />
    );
    loginStatus = (
      <Popover content={content} trigger="hover" placement="bottom">
        <div className={styles.avatarContainer}>
          <Avatar
            src={<Image src={userInfo?.avatar} />}
            size="large"
            icon={<UserOutlined />}
          />
        </div>
      </Popover>
    );
  } else {
    // 未登录
    loginStatus = (
      <Button type="primary" size="large" onClick={props.loginHandle}>
        注册/登录
      </Button>
    );
  }
  return <div className="loginContainer">{loginStatus}</div>;
}

export default LoginButton;
