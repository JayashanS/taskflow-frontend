import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  searchUsers,
  toggleUserStatus,
} from "../store/slices/userSlice";
import { RootState, AppDispatch } from "../store/store";
import { Table, Space, Button, Input, message, Switch, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, MailOutlined } from "@ant-design/icons";
import { User, UserTableProps } from "../interfaces/userInterface";

const UserTable: React.FC<UserTableProps> = ({ setMode, setData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, totalRecords, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
  });
  const [search, setSearch] = useState("");
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (search.trim()) {
      dispatch(searchUsers(search));
    } else {
      dispatch(
        fetchUsers({ page: pagination.current, limit: pagination.pageSize })
      );
    }
  }, [dispatch, pagination.current, pagination.pageSize, search]);

  const handleTableChange = (pagination: any) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleEdit = (user: User) => {
    setMode("edit");
    setData(user);
  };

  const handleDelete = (userId: string) => {
    dispatch(deleteUser(userId))
      .then(() => {
        messageApi.success("User deleted successfully!");
      })
      .catch(() => {
        messageApi.error("Failed to delete user.");
      });
  };

  const handleToggleStatus = async (userId: string) => {
    setLoadingUserId(userId);
    const updatedUsers = users.map((user) =>
      user._id === userId ? { ...user, isEnabled: !user.isEnabled } : user
    );
    dispatch({ type: "users/setUsers", payload: updatedUsers });
    try {
      await dispatch(toggleUserStatus(userId)).unwrap();
      messageApi.success("User status updated successfully!");
    } catch (error) {
      messageApi.error("Failed to update user status.");
    } finally {
      setLoadingUserId(null);
    }
  };

  const handleSendOtpEmail = (userId: string) => {
    // Logic to send OTP email goes here
    console.log(`Sending OTP email to user with ID: ${userId}`);
    // You can dispatch an action or call an API here
    messageApi.success("Email sent");
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: 100,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: 100,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 70,
    },
    {
      title: "Enabled",
      dataIndex: "isEnabled",
      key: "isEnabled",
      width: 70,
      render: (isEnabled: boolean, record: User) => (
        <Switch
          checked={isEnabled}
          onChange={() => handleToggleStatus(record._id)}
          loading={loadingUserId === record._id}
        />
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            overlayStyle={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>

          <Popconfirm
            title="Are you sure you want to send OTP email?"
            onConfirm={() => handleSendOtpEmail(record._id)}
            okText="Yes"
            cancelText="No"
            overlayStyle={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Button icon={<MailOutlined />} shape="circle" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
        }}
      >
        <Button
          type="primary"
          onClick={() => setMode("create")}
          style={{ marginRight: "10px" }}
        >
          Create User
        </Button>

        <Input.Search
          style={{ width: 300 }}
          placeholder="Search users"
          enterButton
          onSearch={handleSearch}
          onChange={handleSearchChange}
          allowClear
        />
      </div>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        scroll={{ y: 450 }}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: totalRecords,
        }}
        loading={loading}
        onChange={handleTableChange}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default UserTable;
