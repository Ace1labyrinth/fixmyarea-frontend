import "leaflet/dist/leaflet.css";

import { AnimatePresence } from "framer-motion";

import React from 'react';
import { useLocation, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Report from "./pages/Report";
import Issues from "./pages/Issues";
import Navbar from "./components/Navbar";

const App = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/issues" element={<Issues />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App