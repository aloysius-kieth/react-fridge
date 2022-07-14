import React from "react";

interface IHeader {
  title: string;
}

const Header = (headerProps: IHeader) => {
  return (
    <div className="">
      <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {headerProps.title}
      </p>
    </div>
  );
};

export default Header;
