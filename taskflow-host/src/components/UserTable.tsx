import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  searchUsers,
  toggleUserStatus,
  inviteUser,
} from "../store/slices/userSlice";
import { setMessage } from "../store/slices/messageSlice";
import { RootState, AppDispatch } from "../store/store";
import { Table, Space, Button, Input, Switch, Popconfirm } from "antd";
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

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        if (search.trim()) {
          await dispatch(searchUsers(search)).unwrap();
        } else {
          await dispatch(
            fetchUsers({ page: pagination.current, limit: pagination.pageSize })
          ).unwrap();
        }
      } catch (error: any) {
        // dispatch(
        //   setMessage({
        //     content: error.message || "An error occurred",
        //     type: "error",
        //   })
        // );
      }
    };

    handleFetchData();
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

  const handleDelete = async (userId: string) => {
    try {
      await dispatch(deleteUser(userId)).unwrap();
      dispatch(
        setMessage({
          content: "User deleted successfully!",
          type: "success",
        })
      );
    } catch (error: any) {
      dispatch(
        setMessage({
          content: "Failed to delete user.",
          type: "error",
        })
      );
    }
  };

  const handleToggleStatus = async (userId: string) => {
    setLoadingUserId(userId);
    const updatedUsers = users.map((user) =>
      user._id === userId ? { ...user, isEnabled: !user.isEnabled } : user
    );
    dispatch({ type: "users/setUsers", payload: updatedUsers });
    try {
      await dispatch(toggleUserStatus(userId)).unwrap();
      dispatch(
        setMessage({
          content: "User status updated successfully!",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        setMessage({
          content: "Failed to update user status.",
          type: "error",
        })
      );
    } finally {
      setLoadingUserId(null);
    }
  };

  const handleSendOtpEmail = async (email: string) => {
    try {
      if (email.trim()) {
        const message = await dispatch(inviteUser(email)).unwrap();
        dispatch(
          setMessage({
            content: "Email sent successfully!",
            type: "success",
          })
        );
      } else {
        dispatch(
          setMessage({
            content: "Please provide a valid email.",
            type: "error",
          })
        );
      }
    } catch (error: any) {
      dispatch(
        setMessage({
          content: "An error occurred while inviting the user.",
          type: "error",
        })
      );
    }
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
      width: 250,
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      width: 150,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 90,
    },
    {
      title: "Enabled",
      dataIndex: "isEnabled",
      key: "isEnabled",
      width: 90,
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
            onConfirm={() => handleSendOtpEmail(record.email)}
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
          placeholder="Search users by name or email"
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
      {/* {error && <div style={{ color: "red" }}>{error}</div>} */}
    </div>
  );
};

export default UserTable;
