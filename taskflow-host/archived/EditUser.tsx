import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Tooltip, Space } from "antd";
import { PushpinOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { User, EditUserProps } from "../interfaces/userInterface";

const EditUser: React.FC<EditUserProps> = ({
  visible,
  onClose,
  initialData,
  onSave,
}) => {
  const [user, setUser] = useState<User>(initialData);
  const [openMap, setOpenMap] = useState(false);

  useEffect(() => {
    setUser(initialData);
  }, [initialData]);

  const handleChange = (key: keyof User, value: string) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(user);
  };

  return (
    <Modal title="Edit User" open={visible} onCancel={onClose} footer={null}>
      <Input
        placeholder="Enter your first name"
        value={user.firstName}
        onChange={(e) => handleChange("firstName", e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Input
        placeholder="Enter your last name"
        value={user.lastName}
        onChange={(e) => handleChange("lastName", e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Input
        placeholder="Email"
        value={user.email}
        onChange={(e) => handleChange("email", e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Input
        placeholder="Enter your mobile number"
        value={user.mobileNumber}
        onChange={(e) => handleChange("mobileNumber", e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Space.Compact style={{ width: "100%", marginBottom: 16 }}>
        <Input
          placeholder="Enter your address"
          value={user.address}
          onChange={(e) => handleChange("address", e.target.value)}
          style={{ flex: 1 }}
        />
        <Tooltip title="Select From Map">
          <Button icon={<PushpinOutlined />} onClick={() => setOpenMap(true)} />
        </Tooltip>
      </Space.Compact>

      <Input.Password
        placeholder="Enter new password (optional)"
        value={user.password || ""}
        onChange={(e) => handleChange("password", e.target.value)}
        suffix={
          <Tooltip title="Password">
            <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
        style={{ marginBottom: 16 }}
      />

      <Button type="primary" block onClick={handleSubmit}>
        Save Changes
      </Button>
    </Modal>
  );
};

export default EditUser;
