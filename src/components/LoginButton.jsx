import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { initUserInfo, changeLoginStatus } from "../redux/userSlice";

import { Button, List, Popover, Avatar, Image, message } from "antd";
import { UserOutlined } from "@ant-design/icons"; // icon引入

import styles from "../css/LoginButton.module.css"; // css模块化引入

// 该组件用于显示用户的头像，如果用户没有登录，那么就显示登录注册按钮
function LoginButton(props) {
  const { isLogin, userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let loginStatus = null;

  function clickHander(i) {
    console.log("click ====", i);
    if (i === 0) {
      // 个人中心
    } else {
      // 退出登录,重置状态仓库，删除token
      message.warning(`等你回来,${userInfo.nickname}`);
      dispatch(initUserInfo({}));
      dispatch(changeLoginStatus(false));
      localStorage.removeItem("token");
    }
  }
  if (isLogin) {
    // 登录了
    const content = (
      <List
        dataSource={["个人中心", "退出登录"]}
        size="large"
        renderItem={(item, index) => {
          return (
            <List.Item
              style={{ cursor: "pointer" }}
              onClick={() => clickHander(index)}
            >
              {item}
            </List.Item>
          );
        }}
      />
    );
    loginStatus = (
      <Popover content={content} trigger="hover" placement="bottom">
        <div className={styles.avatarContainer}>
          <Avatar
            src={<Image src={userInfo?.avatar} preview={false} />}
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
  return <div className="loginBtnContainer">{loginStatus}</div>;
}

export default LoginButton;
