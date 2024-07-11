import { useState, useRef, useEffect } from "react";
import styles from "../css/AddIssue.module.css";
import { typeOptionCreator } from "../utils/tools";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { getTypeList } from "../redux/typeSlice";
import { addIssue } from "../api/issue";

import { Form, Input, Select, Space, Button, message } from "antd";

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function AddIssue() {
  const [form] = Form.useForm();
  const editorRef = useRef();
  const { typeList } = useSelector((state) => state.type);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  // const [issueInfo, setIssueInfo] = useState({
  //   issueTitle: "",
  //   issueContent: "",
  //   userId: "",
  //   typeId: "",
  // });

  useEffect(() => {
    dispatch(getTypeList());
  }, []);

  const onTypeChange = (value) => {};
  const addHandler = (values) => {
    const content = editorRef.current.getInstance().getHTML();
    addIssue({
      issueTitle: values.issueTitle,
      issueContent: content,
      userId: userInfo._id,
      typeId: values.typeId,
    });
    navigator("/");
    message.success("你的问题已经提交，审核通过后将会进行展示！");
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className={styles.container}>
      <Form form={form} name="addIssue" onFinish={addHandler}>
        <Form.Item
          name="issueTitle"
          label="标题"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item
          name="typeId"
          label="问题分类"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="请选择问题分类"
            onChange={onTypeChange}
            allowClear
            style={{
              width: "20%",
            }}
          >
            {typeOptionCreator(Select, typeList)}
          </Select>
        </Form.Item>
        <Form.Item
          label="问题描述"
          name="issueContent"
          rules={[{ required: true, message: "请输入问题描述" }]}
        >
          <Editor
            initialValue=""
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            language="zh-CN"
            ref={editorRef}
          />
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Space>
            <Button type="primary" htmlType="submit">
              确认新增
            </Button>
            <Button type="link" htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
