import { Paper } from "@mui/material";
import React from "react";
import FridgeTable from "../components/FridgeTable";
import Header from "../components/Header";
import { useStateContext } from "../contexts/contextProvider";

const Fridge = () => {
  const { isSidebarOpen } = useStateContext();
  return (
    <div
      className={`ml-28 mr-8 mt-10 p-10 pb-20 md:p-10 bg-white rounded-3xl ${
        isSidebarOpen ? "md:m-10" : "md:m-28"
      }`}
    >
      {/* <Paper variant="outlined"/> */}
      <Header title="What's in my Fridge?" />
      <FridgeTable />
    </div>
  );
};

export default Fridge;
