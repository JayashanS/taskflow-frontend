import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  LockOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  Input,
  Button,
  Tooltip,
  message,
  Typography,
  Result,
  Spin,
} from "antd";
import { updatePassword } from "../services/userService";

const { Title, Text } = Typography;

const WelcomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const otpParam = searchParams.get("otp");
    if (emailParam && otpParam) {
      setEmail(emailParam);
      setOtp(otpParam);
    }
  }, [searchParams]);

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return false;
    }
    if (!/[A-Z]/.test(pwd)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!/[0-9]/.test(pwd)) {
      setPasswordError("Password must contain at least one number.");
      return false;
    }
    if (!/[!@#$%^&*]/.test(pwd)) {
      setPasswordError("Password must contain at least one special character.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordValid(validatePassword(newPassword));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      message.error("Passwords do not match!");
      return;
    }
    if (!passwordValid) {
      message.error("Password does not meet requirements!");
      return;
    }

    setIsLoading(true);

    const result = await updatePassword(email, password, otp);

    setIsLoading(false);

    if (result.success) {
      message.success(result.message);
      setIsSuccess(true);
    } else {
      message.error(result.message);
      setIsSuccess(false);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (isSuccess !== null) {
    return isSuccess ? (
      <Result
        status="success"
        title="Password Updated Successfully!"
        subTitle="You can now log in with your new password."
        extra={[
          <Button type="primary" key="login" onClick={() => navigate("/login")}>
            Go to Login
          </Button>,
        ]}
      />
    ) : (
      <Result
        status="error"
        title="Password Update Failed"
        subTitle="There was an issue updating your password. Please try again."
        extra={[
          <Button type="primary" key="retry" onClick={handleUpdatePassword}>
            Retry
          </Button>,
        ]}
      />
    );
  }

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
      <Title level={3} style={{ marginBottom: "0px" }}>
        Welcome to Task Flow!
      </Title>
      <Text style={{ marginBottom: "50px", color: "#b3b3b3" }}>
        Please update your password to continue...
      </Text>

      <Input.Password
        size="large"
        placeholder="Enter your password"
        prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
        suffix={
          <Tooltip title="Must be at least 8 characters with one uppercase letter, one number, and one special character.">
            {passwordValid ? (
              <CheckCircleOutlined style={{ color: "green" }} />
            ) : (
              <CloseCircleOutlined style={{ color: "red" }} />
            )}
          </Tooltip>
        }
        style={{ width: "100%", maxWidth: "300px", marginBottom: "8px" }}
        value={password}
        onChange={handlePasswordChange}
      />
      {passwordError && (
        <Text type="danger" style={{ marginBottom: "12px" }}>
          {passwordError}
        </Text>
      )}

      <Input.Password
        size="large"
        placeholder="Confirm your password"
        prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
        suffix={
          password && confirmPassword ? (
            password === confirmPassword ? (
              <CheckCircleOutlined style={{ color: "green" }} />
            ) : (
              <CloseCircleOutlined style={{ color: "red" }} />
            )
          ) : (
            <Tooltip title="Re-enter the same password">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          )
        }
        style={{ width: "100%", maxWidth: "300px", marginBottom: "8px" }}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      {confirmPasswordError && (
        <Text type="danger" style={{ marginBottom: "12px" }}>
          {confirmPasswordError}
        </Text>
      )}

      <Button
        size="large"
        type="primary"
        htmlType="submit"
        style={{ width: "100%", maxWidth: "300px" }}
        onClick={handleUpdatePassword}
      >
        Update Password
      </Button>
    </div>
  );
};

export default WelcomePage;
