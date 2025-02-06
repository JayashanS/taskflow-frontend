import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { createUser, editUser } from "../store/slices/userSlice";
import { setMessage } from "../store/slices/messageSlice";
import { Form, Input, Button, Select, message } from "antd";
import { ArrowLeftOutlined, PushpinOutlined } from "@ant-design/icons";
import { UserFormProps } from "../interfaces/userInterface";
import AddressPicker from "./AddressPicker";
import { isValidPhoneNumber } from "libphonenumber-js";

const roles = ["admin", "user"];

const UserForm: React.FC<UserFormProps> = ({
  mode,
  data,
  setMode,
  onSubmit,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const [password, setPassword] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    if (mode === "edit" && data) {
      form.setFieldsValue(data);
      setSelectedAddress(data.address);
      setPhoneNumber(data.mobileNumber);
    } else {
      setPassword(generatePassword());
    }
  }, [mode, data, form]);

  const generatePassword = (): string => {
    const length = 8;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };

  const handleSubmit = async (values: any) => {
    if (!isValidPhoneNumber(phoneNumber)) {
      dispatch(
        setMessage({
          content: "Invalid phone number! Please enter a valid phone number.",
          type: "error",
        })
      );
      return;
    }

    try {
      values.address = selectedAddress;

      if (mode === "create") {
        values.password = password;
        await dispatch(createUser(values));
      } else if (mode === "edit" && data) {
        values._id = data._id;
        await dispatch(editUser(values));
      }

      dispatch(
        setMessage({
          content: `${
            mode === "create" ? "User created" : "User updated"
          } successfully!`,
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        setMessage({
          content:
            "An error occurred while processing the request. Please try again.",
          type: "error",
        })
      );
    }

    form.resetFields();
    setMode("view");
  };

  const handleAddressButtonClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    form.setFieldsValue({ address: selectedAddress });
  }, [selectedAddress]);

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
  };
  return (
    <div
      style={{
        height: "85vh",
        width: "100%",
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          borderBottom: "1px solid #ddd",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Button icon={<ArrowLeftOutlined />} onClick={() => setMode("view")}>
          Back
        </Button>
        <h3 style={{ margin: 0 }}>
          {mode === "create" ? "Create User" : "Edit User"}
        </h3>
        <div></div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: " 30px 100px" }}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input the first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please input the last name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mobile Number"
            name="mobileNumber"
            rules={[
              { required: true, message: "Please input the mobile number!" },
            ]}
          >
            <Input
              value={phoneNumber}
              onChange={(e) => handlePhoneNumberChange(e.target.value)}
              placeholder="Enter phone number with country code"
            />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input
              value={selectedAddress}
              suffix={
                <Button
                  type="link"
                  icon={<PushpinOutlined />}
                  onClick={handleAddressButtonClick}
                  style={{ padding: 0 }}
                />
              }
              onChange={(e) => setSelectedAddress(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select>
              {roles.map((role) => (
                <Select.Option key={role} value={role}>
                  {role}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {mode === "create" && (
            <Form.Item label="Generated Password">
              <Input.Password value={password} readOnly />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {mode === "create" ? "Create User" : "Update User"}
            </Button>
          </Form.Item>
        </Form>
        <AddressPicker
          open={isModalOpen}
          address={selectedAddress}
          handleClose={() => setIsModalOpen(false)}
          setAddress={setSelectedAddress}
        />
      </div>
    </div>
  );
};

export default UserForm;
