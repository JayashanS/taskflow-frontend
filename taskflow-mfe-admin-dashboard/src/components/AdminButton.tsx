import React from "react";

const Button: React.FC = () => {
  return (
    <button onClick={() => alert("Hello from Admin Dashboard!")}>
      Button
    </button>
  );
};

export default Button;