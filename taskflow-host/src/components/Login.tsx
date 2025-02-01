import React from "react";
import {
  UserOutlined,
  LockOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Input, Button, Tooltip } from "antd";

const App: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
      padding: "20px",
    }}
  >
    <Input
      size="large"
      placeholder="Enter your email"
      prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
      suffix={
        <Tooltip title="Email address">
          <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
        </Tooltip>
      }
      style={{ width: "100%", maxWidth: "300px" }}
    />

    <Input.Password
      size="large"
      placeholder="Enter your password"
      prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
      suffix={
        <Tooltip title="Password">
          <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
        </Tooltip>
      }
      style={{ width: "100%", marginTop: "16px", maxWidth: "300px" }}
    />

    <Button
      size="large"
      type="primary"
      htmlType="submit"
      style={{ width: "100%", marginTop: "16px", maxWidth: "300px" }}
    >
      Log in
    </Button>
  </div>
);

export default App;
