import React from "react";
import { Button, message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddIssue = (props) => {
  const { isLogin } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const clickHandle = () => {
    // 判断是否登录
    if (isLogin) {
      // 跳转添加问答页面
      navigate("/addIssue");
    } else {
      message.warning("请先登录");
    }
  };

  return (
    <Button
      type="primary"
      size="large"
      style={{
        width: "100%",
        marginBottom: "30px",
      }}
      onClick={clickHandle}
    >
      我要发问
    </Button>
  );
};

export default AddIssue;
