import React from "react";
import Issues from "../pages/Issues";
import Books from "../pages/Books";
import Interfaces from "../pages/Interfaces";
import AddIssue from "../pages/AddIssue";
import IssueDetail from "../pages/IssueDetail";

import { Routes, Route, Navigate } from "react-router-dom";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/issues" element={<Issues />}></Route>
      <Route path="/books" element={<Books />}></Route>
      <Route path="/interfaces" element={<Interfaces />}></Route>
      <Route path="/addIssue" element={<AddIssue />}></Route>
      <Route path="/issues/:id" element={<IssueDetail />}></Route>
      <Route path="/" element={<Navigate replace to="/issues" />}></Route>
    </Routes>
  );
};

export default RouterConfig;
