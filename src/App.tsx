import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { useState } from "react";

export default function App() {

  return (
    <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
  );
}
