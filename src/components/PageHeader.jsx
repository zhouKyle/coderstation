import React from "react";
import styles from "../css/PageHeader.module.css";

const PageHeader = (props) => {
  return (
    <div className={styles.row}>
      <div className={styles.pageHeader}>{props.children}</div>
      {/* 分类选择 */}
    </div>
  );
};

export default PageHeader;
