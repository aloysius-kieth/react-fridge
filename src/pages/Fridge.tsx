import { Paper } from "@mui/material";
import React from "react";
import FridgeTable from "../components/FridgeTable";
import Header from "../components/Header";
import { useStateContext } from "../contexts/contextProvider";

const Fridge = () => {
  const { isSidebarOpen, setSidebarOpen } = useStateContext();
  return (
    <div className={`mx-24 mt-20 p-2 md:p-10 bg-white rounded-3xl ${isSidebarOpen ? "md:m-10":"md:m-28"}`}>
      {/* <Paper variant="outlined"/> */}
      <Header title="Fridge" />
      <FridgeTable />
    </div>
  );
};

export default Fridge;
