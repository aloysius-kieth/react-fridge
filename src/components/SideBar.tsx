import React, { useEffect, useState } from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import DiamondRoundedIcon from "@mui/icons-material/DiamondRounded";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { useStateContext } from "../contexts/contextProvider";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const { screenSize, setScreenSize, isSidebarOpen, setSidebarOpen } =
    useStateContext();
  const Menus = [
    { name: "Fridge", icon: <KitchenOutlinedIcon /> },
    { name: "Recipes", icon: <MenuBookOutlinedIcon /> },
  ];

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 768) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [screenSize]);

  return (
    <div
      className={`${
        isSidebarOpen ? "w-72" : "w-20"
      }  h-screen p-5 pt-8 bg-side-bar-bg duration-300 fixed z-50`}
    >
      <ArrowBackIosNewRoundedIcon
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-black
  border-2 rounded-full  ${!isSidebarOpen && "rotate-180"}`}
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex gap-x-6 items-center">
        <DiamondRoundedIcon
          className={`cursor-pointer ml-2 ${
            isSidebarOpen && "rotate-180 duration-500"
          }`}
        />
        <h1
          className={`text-black origin-left font-medium text-xl duration-300 flex items-center ${
            !isSidebarOpen && "scale-0"
          }`}
        >
          MiFridge
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((item, index) => (
          <NavLink to={`/${item.name}`} key={item.name} onClick={() => {}}>
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-grayBlue text-md text-black items-center gap-x-4`}
            >
              {item.icon}
              <span
                className={`${
                  !isSidebarOpen && "hidden"
                } duration-300 origin-left`}
              >
                {item.name}
              </span>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
