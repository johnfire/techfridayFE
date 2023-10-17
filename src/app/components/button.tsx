import React from "react";

const Button = (children: any) => {
  return (
    <button className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4">
      {children}
    </button>
  );
};

export default Button;
