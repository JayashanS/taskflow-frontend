import React from "react";
import { Spin } from "antd";

const FallbackUI: React.FC = () => {
  const contentStyle: React.CSSProperties = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
    textAlign: "center",
  };

  return (
    <Spin tip="Loading..." size="large" style={contentStyle}>
      <div />
    </Spin>
  );
};

export default FallbackUI;
