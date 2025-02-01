import React, { ReactNode } from "react";
import { ConfigProvider } from "antd";

const theme = {
  token: {
    colorPrimary: "#9003fc",
  },
};

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export default ThemeProvider;
