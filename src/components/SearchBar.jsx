import React from "react";
import { Input, Select, Space } from "antd";
const { Search } = Input;
const options = [
  {
    value: "issue",
    label: "问答",
  },
  {
    value: "book",
    label: "书籍",
  },
  {
    value: "interface",
    label: "面试题",
  },
];

function SearchBar() {
  return (
    <div className="searchBarContainer">
      {/* antd的组件组合 */}
      <Space.Compact size="large" block>
        <Select
          defaultValue="issue"
          options={options}
          style={{ width: "30%" }}
        />
        <Search
          placeholder="请输入要搜索的内容"
          enterButton="搜索"
          size="large"
        />
      </Space.Compact>
      {/* 另一种写法 */}
      {/* <Input.Group compact>
        <Select defaultValue="issue" size="large">
          <Select.Option value="issue">问答</Select.Option>
          <Select.Option value="book">书籍</Select.Option>
        </Select>
        <Input.Search
          placeholder="请输入要搜索的内容"
          allowClear
          enterButton="搜索"
          size="large"
          style={{
            width: "80%",
          }}
        ></Input.Search>
      </Input.Group> */}
    </div>
  );
}

export default SearchBar;
