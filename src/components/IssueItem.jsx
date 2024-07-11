import { useState, useEffect } from "react";

import { formatDate } from "../utils/tools";

import styles from "../css/IssueItem.module.css";
import { Tag } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInfoById } from "../api/user";

function IssueItem(props) {
  const { typeList } = useSelector((state) => state.type); //状态列表
  const [userInfo, setUserInfo] = useState({}); //存储用户信息
  const navigator = useNavigate();

  /**
   * 进入详情页面
   */
  const clickHandle = (id) => {
    // console.log("click>>>", id);
    // 跳转到对应的详情页面
    navigator(`/issues/${id}`);
  };

  const colorArr = [
    "#108ee9",
    "#2db7f5",
    "#f50",
    "green",
    "#87d068",
    "blue",
    "red",
    "purple",
  ]; //颜色列表

  useEffect(() => {
    //发送请求获取用户的信息
    async function fetchUserInfo() {
      const { data } = await getUserInfoById(props.issueInfo.userId);
      setUserInfo(data);
    }
    fetchUserInfo();
  }, []);

  const type = typeList.find((val) => val._id === props.issueInfo.typeId);
  return (
    <div className={styles.container}>
      {/* 回答数 */}
      <div className={styles.issueNum}>
        <div>{props.issueInfo.commentNumber}</div>
        <div>回答</div>
      </div>

      {/* 浏览数 */}
      <div className={styles.issueNum}>
        <div>{props.issueInfo.scanNumber}</div>
        <div>浏览</div>
      </div>

      {/* 问题内容 */}
      <div className={styles.issueContainer}>
        <div
          className={styles.top}
          onClick={() => clickHandle(props.issueInfo._id)}
        >
          {props.issueInfo.issueTitle}
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <Tag color={colorArr[typeList.indexOf(type) % colorArr.length]}>
              {type?.typeName}
            </Tag>
          </div>
          <div className={styles.right}>
            <Tag color="volcano">{userInfo.nickname}</Tag>
            <span>{formatDate(props.issueInfo.issueDate, "year")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueItem;
