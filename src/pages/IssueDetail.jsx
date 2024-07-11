import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Recommend from "../components/Recommend";
import ScoreRank from "../components/ScoreRank";

import { useParams } from "react-router-dom";

import { Card, Pagination } from "antd";

import styles from "../css/IssueDetail.module.css";

import { getIssueById } from "../api/issue";

/**
 * 问答的详情
 * @returns
 */
export default function IssueDetail() {
  // 获取页面参数 id
  const { id } = useParams();
  const [issueDetail, setIssueDetail] = useState({});

  useEffect(() => {
    //根据 id 获取详情
    const fetchIssueById = async function () {
      const result = await getIssueById(id);
      setIssueDetail(result.data);
      console.log("issueDetail>>>", result.data);
    };
    fetchIssueById();
  }, []);

  return (
    <div>
      {/* 上面的头部 */}
      <PageHeader>问答详情</PageHeader>
      {/* 下面的列表内容区域 */}
      <div className={styles.issueContainer}>
        {/* 左边区域 */}
        <div className={styles.leftSide}>
          <div className={styles.issueDetail}>
            <Card title={issueDetail.issueTitle}>
              <div>
                <div>123</div>
                <div>123</div>
                <div>43</div>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: issueDetail.issueContent }}
              />
            </Card>
          </div>
          <div className="paginationContainer">
            <Pagination />
          </div>
        </div>
        {/* 右边区域 */}
        <div>
          <Recommend />
          <ScoreRank />
        </div>
      </div>
    </div>
  );
}
