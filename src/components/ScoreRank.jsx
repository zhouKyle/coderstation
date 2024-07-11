import { useEffect, useState } from "react";
import { Card } from "antd";
import ScoreRankItem from "./ScoreRankItem";

import { scoreRank } from "../api/user";

export default function ScoreRank() {
  const [scoreRankList, setScoreRankList] = useState([]);
  useEffect(() => {
    async function getScoreRank() {
      const res = await scoreRank();
      console.log("ScoreRank>>", res.data);
      setScoreRankList(res.data);
    }
    getScoreRank();
  }, []);

  // 积分前十名
  const scoreRankListDom = scoreRankList.map((val, index) => {
    return <ScoreRankItem user={val} key={index} index={index} />;
  });

  return (
    <Card
      title="积分排行榜"
      bordered={false}
      style={{ width: 300, marginTop: 24 }}
    >
      {scoreRankListDom}
    </Card>
  );
}
