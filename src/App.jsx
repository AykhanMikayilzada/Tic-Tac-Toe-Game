import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";import Home from "./Components/Home"; 
import Game from "./Components/Game"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
