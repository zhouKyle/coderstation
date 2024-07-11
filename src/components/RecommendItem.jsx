import React from "react";
import { Divider, Flex, Tag } from "antd";

function RecommendItem(props) {
  return (
    <div>
      {/* 分割线 */}
      <Divider style={{ margin: "24px 0 10px 0", background: "#ccc" }} />
      <Flex gap="small" align="center">
        <Tag color="#55acee" style={{ height: "20px" }}>
          {props.index}
        </Tag>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Flex>
    </div>
  );
}

export default RecommendItem;
