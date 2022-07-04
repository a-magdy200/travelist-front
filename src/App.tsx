import React from "react";
import "./App.css";
import "./styles/program.css";
import ListPrograms from "./components/programs/index";
import Create from "./components/programs/create";
import Create2 from "./components/programs/create2";
import Show from "./components/programs/show";
import CreateCycle from "./components/cycles/create";
import Profile from "./components/Profile";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPrograms />} />
        <Route path="/index" element={<ListPrograms />} />
        <Route path="/create" element={<Create />} />
        <Route path="/create2" element={<Create2 />} />
        <Route path="/show" element={<Show />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cycle/create" element={<CreateCycle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
