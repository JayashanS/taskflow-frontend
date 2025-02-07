import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import {
  UserOutlined,
  LockOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Input, Button, Tooltip, notification, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import AnimatedLogo from "../assets/AnimatedLogo";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Text } = Typography;

  const handleLogin = async () => {
    setLoading(true);
    try {
      const token = await loginUser(email, password);

      dispatch(login(token));

      window.location.href = "/";
    } catch (error: any) {
      notification.error({
        message: "Login Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AnimatedLogo />
        <Text
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginLeft: "10px",
          }}
        >
          Task Flow
        </Text>
      </div>

      <Input
        size="large"
        placeholder="Enter your email"
        prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
        suffix={
          <Tooltip title="Email address">
            <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
        style={{ width: "100%", maxWidth: "300px", marginTop: "20px" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        size="large"
        type="primary"
        htmlType="submit"
        style={{ width: "100%", marginTop: "16px", maxWidth: "300px" }}
        onClick={handleLogin}
      >
        Log in
      </Button>
    </div>
  );
};

export default LoginPage;
