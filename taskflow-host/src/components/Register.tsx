import React, { useState } from "react";
import { PushpinOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Input, Button, Tooltip, Space } from "antd";
import AddressPicker from "./AddressPicker";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobileNumber(e.target.value);
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    console.log({
      firstName,
      lastName,
      email,
      mobileNumber,
      address,
      password,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
          placeholder="Enter your first name"
          value={firstName}
          onChange={handleFirstNameChange}
          style={{ width: "100%", maxWidth: "300px" }}
        />

        <Input
          size="large"
          placeholder="Enter your last name"
          value={lastName}
          onChange={handleLastNameChange}
          style={{
            width: "100%",
            marginTop: "16px",
            maxWidth: "300px",
          }}
        />

        <Input
          size="large"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          suffix={
            <Tooltip title="Email address">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
          style={{
            width: "100%",
            marginTop: "16px",
            maxWidth: "300px",
          }}
        />

        <Input
          size="large"
          placeholder="Enter your mobile number"
          value={mobileNumber}
          onChange={handleMobileNumberChange}
          style={{
            width: "100%",
            marginTop: "16px",
            maxWidth: "300px",
          }}
        />

        <Space.Compact
          style={{
            width: "100%",
            marginTop: "16px",
            maxWidth: "300px",
          }}
        >
          <Input
            size="large"
            placeholder="Enter your address"
            value={address}
            onChange={handleAddressChange}
            style={{
              width: "80%",
              maxWidth: "300px",
            }}
          />
          <Tooltip title="Select From Map">
            <Button
              size="large"
              style={{
                width: "20%",
                maxWidth: "300px",
              }}
              icon={<PushpinOutlined />}
              onClick={handleOpen}
            ></Button>
          </Tooltip>
        </Space.Compact>

        <Input.Password
          size="large"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          suffix={
            <Tooltip title="Password">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
          style={{
            width: "100%",
            marginTop: "16px",
            maxWidth: "300px",
          }}
        />

        <Button
          size="large"
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
          style={{
            width: "100%",
            marginTop: "16px",
            maxWidth: "300px",
          }}
        >
          Sign up
        </Button>
      </div>
      <AddressPicker
        open={open}
        handleClose={handleClose}
        setAddress={setAddress}
      />
    </>
  );
};

export default Register;
