import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import { useStateContext } from "./contexts/contextProvider";
import Fridge from "./pages/Fridge";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";

import "./App.css";

const App = () => {
  const { isSidebarOpen, setSidebarOpen } = useStateContext();
  return (
    <div>
      <BrowserRouter>
        <div className="flex relative bg-main-bg">
          {/* Sidebar */}
          <SideBar />
          {/* Main Content */}
          <div
            className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
              isSidebarOpen ? "md:ml-72" : "flex-2"
            }`}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/fridge" element={<Fridge />} />
              <Route path="/recipes" element={<Recipes />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
