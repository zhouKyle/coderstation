import React from "react";
import { Card, Carousel } from "antd";

import RecommendItem from "./RecommendItem.jsx";

import styles from "../css/Recommend.module.css";

function Recommend(props) {
  const recommendList = [1, 2, 3, 4];
  const recommendListDom = recommendList.map((index, val) => {
    return <RecommendItem key={index} index={index} />;
  });

  return (
    <Card title="推荐内容" bordered={false} style={{ width: 300 }}>
      {/* 走马灯 */}
      <Carousel autoplay>
        <div>
          <h3 className={styles.carouselContainer}>1</h3>
        </div>
        <div>
          <h3 className={styles.carouselContainer}>2</h3>
        </div>
        <div>
          <h3 className={styles.carouselContainer}>3</h3>
        </div>
        <div>
          <h3 className={styles.carouselContainer}>4</h3>
        </div>
      </Carousel>
      {/* 推荐内容 */}
      {recommendListDom}
    </Card>
  );
}

export default Recommend;
