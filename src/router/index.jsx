import React from "react";
import { Issues } from "../pages/Issues";
import { Books } from "../pages/Books";
import { Interfaces } from "../pages/Interfaces";

import { Routes, Route, Navigate } from "react-router-dom";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/issues" element={<Issues />}></Route>
      <Route path="/books" element={<Books />}></Route>
      <Route path="/interfaces" element={<Interfaces />}></Route>
      <Route path="/" element={<Navigate replace to="/issues" />}></Route>
    </Routes>
  );
};

export default RouterConfig;
