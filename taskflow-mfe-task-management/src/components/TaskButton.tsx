import React from "react";

const Button: React.FC = () => {
  console.log("Rendering Task Management Button");
  return (
    <button onClick={() => alert("Hello from Task Management!")}>
      Buttons
    </button>
  );
};

export default Button;