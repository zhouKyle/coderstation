import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { Menu } from "antd";

const items = [
  {
    label: <NavLink to="/issues">问答</NavLink>,
    key: "issues",
  },
  {
    label: <NavLink to="/books">书籍</NavLink>,
    key: "books",
  },
  {
    label: <NavLink to="/interfaces">面试题</NavLink>,
    key: "interfaces",
  },
  {
    label: (
      <a href="https://ant.design" rel="noopener noreferrer">
        视频教程
      </a>
    ),
    key: "videos",
  },
];

function Navigator() {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div className="navContainer">
      <Menu
        className="my-menu"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
}

export default Navigator;
