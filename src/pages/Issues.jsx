import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import IssueItem from "../components/IssueItem";
import AddIssue from "../components/AddIssue";
import Recommend from "../components/Recommend";

import { Pagination } from "antd";

import { getIssueByPage } from "../api/issue";
import { useDispatch } from "react-redux";

import { getTypeList } from "../redux/typeSlice";

import styles from "../css/Issue.module.css";
import ScoreRank from "../components/ScoreRank";

const Issues = () => {
  const dispatch = useDispatch();
  //用于存储获取到的问答列表
  const [issueInfo, setIssueInfo] = useState([]);

  // 分页信息
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  function handlerPageChange(current, pageSize) {
    setPageInfo({
      current,
      pageSize,
    });
  }

  useEffect(() => {
    dispatch(getTypeList());

    async function fetchData() {
      const { data } = await getIssueByPage({
        current: pageInfo.current + "",
        pageSize: pageInfo.pageSize + "",
        issueStatus: true,
      });
      setIssueInfo(data.data);
      console.log("data>>", data);
      setPageInfo({
        current: data.currentPage,
        pageSize: data.eachPage,
        total: data.totalPage * data.eachPage,
      });
    }
    fetchData();
  }, [pageInfo.current, pageInfo.pageSize]);

  let issueList = [];
  for (let i = 0; i < issueInfo.length; i++) {
    issueList.push(<IssueItem key={i} issueInfo={issueInfo[i]}></IssueItem>);
  }

  return (
    <div className={styles.container}>
      {/* 上面的头部 */}
      <PageHeader>问答列表</PageHeader>
      {/* 下面的列表内容区域 */}
      <div className={styles.issueContainer}>
        {/* 左边区域 */}
        <div className={styles.leftSide}>
          {issueList}
          <div className="paginationContainer">
            <Pagination
              showQuickJumper
              defaultCurrent={1}
              {...pageInfo}
              onChange={handlerPageChange}
              pageSizeOptions={[5, 10, 15, 20, 30]}
              showSizeChanger
            />
          </div>
        </div>
        {/* 右边区域 */}
        <div className={styles.rightSide}>
          <AddIssue />
          <Recommend />
          <ScoreRank />
        </div>
      </div>
    </div>
  );
};

export default Issues;
