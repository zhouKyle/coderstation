import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Radio,
  Form,
  Input,
  Button,
  Row,
  Col,
  Checkbox,
  message,
} from "antd";
import { initUserInfo, changeLoginStatus } from "../redux/userSlice";
import { useDispatch } from "react-redux";

import styles from "../css/LoginForm.module.css";

import { getCaptcha, userIsExist, addUser } from "../api/user";

const LoginForm = (props) => {
  const [value, setValue] = useState(1);
  const loginFormRef = useRef();
  const registerFormRef = useRef();
  const dispatch = useDispatch();
  // 登录表单的状态数据
  const [loginInfo, setLoginInfo] = useState({
    loginId: "",
    loginPwd: "",
    captcha: "",
    remember: false,
  });
  // 注册表单的状态数据
  const [registerInfo, setRegisterInfo] = useState({
    loginId: "",
    nickName: "",
    captcha: "",
  });

  const [captcha, setCaptcha] = useState(null);

  // 打开即获取验证码
  useEffect(() => {
    async function fetchData() {
      captchaClickHandle();
    }
    fetchData();
  }, [props.isShow]);

  function handleOk() {}

  function onChange(e) {
    setValue(e.target.value); // 修改value的值，达到单选框能够切换
    captchaClickHandle(); //修改验证码
  }

  function loginHandle() {}

  //关闭登录的弹框，清空历史记录
  function handleCancel() {
    //清空上一次的内容
    setRegisterInfo({
      loginId: "",
      nickName: "",
      captcha: "",
    });
    setLoginInfo({
      loginId: "",
      loginPwd: "",
      captcha: "",
      remember: false,
    });
    props.closeModal(); //关闭弹框
  }

  //注册对应的逻辑
  async function registerHandle() {
    const result = await addUser(registerInfo);
    if (result.data) {
      message.success("用户注册成功！");
      // 将用户的信息存储到数据仓库里
      dispatch(initUserInfo(result.data));
      // 数据仓库的登录状态 --》 true
      dispatch(changeLoginStatus(true));
      // 关闭登录的弹框
      handleCancel();
    } else {
      message.warning(result.msg);
      captchaClickHandle(); // 更新验证码
    }
  }

  /**
   * 更新用户的loginInfo状态值
   * @param {*} oldInfo 之前整体的状体
   * @param {*} newContent 用户输入的内容
   * @param {*} key 对应的info的键名
   * @param {*} setInfo 修改状态值的函数
   */
  function updateInfo(oldInfo, newContent, key, setInfo) {
    const obj = { ...oldInfo };
    obj[key] = newContent;
    setInfo(obj);
  }

  async function captchaClickHandle() {
    const result = await getCaptcha();
    setCaptcha(result);
  }

  //验证注册账号是否存在
  async function checkLoginIdIsExist() {
    if (!registerInfo.loginId) return;
    const { data } = await userIsExist(registerInfo.loginId);
    if (data) {
      return Promise.reject("该用户已注册！"); // 用户已经注册
    }
  }

  // 登录/注册的表单面板
  let container = null;
  if (value === 1) {
    // 登录面板的JSX
    container = (
      <div className={styles.container}>
        <Form
          name="basic1"
          autoComplete="off"
          onFinish={loginHandle}
          ref={loginFormRef}
        >
          {/* 账号 */}
          <Form.Item
            label="登录账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: "请输入账号",
              },
            ]}
          >
            <Input
              placeholder="请输入你的登录账号"
              value={loginInfo.loginId}
              onChange={(e) =>
                updateInfo(loginInfo, e.target.value, "loginId", setLoginInfo)
              }
            />
          </Form.Item>
          {/* 密码 */}
          <Form.Item
            label="登录密码"
            name="loginPwd"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input.Password
              placeholder="请输入你的登录密码，新用户默认为123456"
              value={loginInfo.loginPwd}
              onChange={(e) =>
                updateInfo(loginInfo, e.target.value, "loginPwd", setLoginInfo)
              }
            />
          </Form.Item>
          {/* 验证码 */}
          <Form.Item
            label="验证码"
            name="logincaptcha"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  placeholder="请输入验证码"
                  value={loginInfo.captcha}
                  onChange={(e) =>
                    updateInfo(
                      loginInfo,
                      e.target.value,
                      "captcha",
                      setLoginInfo
                    )
                  }
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={captchaClickHandle}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>
          {/* 是否记住 */}
          <Form.Item
            name="remember"
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Checkbox
              onChange={(e) =>
                updateInfo(
                  loginInfo,
                  e.target.checked,
                  "remember",
                  setLoginInfo
                )
              }
              checked={loginInfo.remember}
            >
              记住我
            </Checkbox>
          </Form.Item>
          {/* 登录/重置按钮 */}
          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              登录
            </Button>
            <Button type="primary" htmlType="submit">
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  } else {
    // 注册面板的JSX
    container = (
      <div className={styles.container}>
        <Form
          name="basic2"
          autoComplete="off"
          ref={registerFormRef}
          onFinish={registerHandle}
        >
          {/* 注册账号 */}
          <Form.Item
            label="登录账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: "请输入账号，仅此项为必填项",
              },
              {
                validator: checkLoginIdIsExist, //验证用户是否已经存在
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="请输入账号"
              value={registerInfo.loginId}
              onChange={(e) =>
                updateInfo(
                  registerInfo,
                  e.target.value,
                  "loginId",
                  setRegisterInfo
                )
              }
            />
          </Form.Item>
          {/* 昵称 */}
          <Form.Item label="用户昵称" name="nickName">
            <Input
              placeholder="请输入昵称，不填写默认为新用户xxx"
              value={registerInfo.nickName}
              onChange={(e) =>
                updateInfo(
                  registerInfo,
                  e.target.value,
                  "nickName",
                  setRegisterInfo
                )
              }
            />
          </Form.Item>
          {/* 验证码 */}
          <Form.Item
            label="验证码"
            name="Registercaptcha"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  placeholder="请输入验证码"
                  value={registerInfo.captcha}
                  onChange={(e) =>
                    updateInfo(
                      registerInfo,
                      e.target.value,
                      "captcha",
                      setRegisterInfo
                    )
                  }
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={captchaClickHandle}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>
          {/* 注册/重置按钮 */}
          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              注册
            </Button>
            <Button type="primary" htmlType="submit">
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  return (
    <div>
      <Modal
        title="注册/登录"
        open={props.isShow}
        onOk={handleOk}
        onCancel={props.closeModal}
      >
        <Radio.Group
          value={value}
          onChange={onChange}
          className={styles.radioGroup}
          buttonStyle="solid"
        >
          <Radio.Button value={1} className={styles.radioButton}>
            登录
          </Radio.Button>
          <Radio.Button value={2} className={styles.radioButton}>
            注册
          </Radio.Button>
        </Radio.Group>
        {/* 下面需要显示对应功能的表单 */}
        {container}
      </Modal>
    </div>
  );
};

export default LoginForm;
