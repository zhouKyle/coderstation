import React from "react";
import styles from "../css/ScoreRankItem.module.css";
import { Flex, Avatar } from "antd";

export default function ScoreRankItem(props) {
  return (
    <Flex justify="start" align="center">
      <p className={styles.item}>{props.index + 1}</p>
      <Avatar src={<img src={props.user.avatar} alt="avatar" />} />
      <p className={styles["item-flex-one"]}>{props.user.nickname}</p>
      <p>{props.user.points}</p>
    </Flex>
  );
}
