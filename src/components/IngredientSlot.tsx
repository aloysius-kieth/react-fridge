import React from "react";

interface IIngredent {
  name: string;
}

const IngredientSlot = (prop: IIngredent) => {
  const options = {
    filterType: "checkbox",
  };
  return (
    <div className="bg-cyan-700 rounded-md w-96 h-36 flex items-center justify-center">
      <p className="text-3xl font-extrabold tracking-tight text-black">
        {prop.name}
      </p>
    </div>
  );
};

export default IngredientSlot;
