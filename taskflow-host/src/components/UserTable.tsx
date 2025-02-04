import React, { useEffect, useState } from "react";
import { Table, Space, Button, Input, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../store/slices/userSlice";
import { RootState, AppDispatch } from "../store/store";
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

  useEffect(() => {
    dispatch(
      fetchUsers({ page: pagination.current, limit: pagination.pageSize })
    );
  }, [dispatch, pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination: any) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleEdit = (user: User) => {
    setMode("edit");
    setData(user);
  };

  const handleDelete = (userId: string) => {
    // Use the native confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user? This action cannot be undone."
    );

    if (isConfirmed) {
      dispatch(deleteUser(userId))
        .then(() => {
          message.success("User deleted successfully!");
        })
        .catch(() => {
          message.error("Failed to delete user.");
        });
    } else {
      // If user canceled, you can log or handle if needed
      console.log("User deletion canceled.");
    }
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
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
    },
    {
      title: "Enabled",
      dataIndex: "isEnabled",
      key: "isEnabled",
      render: (text: boolean) => (text ? "Yes" : "No"),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record._id)}>Delete</Button>
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
          justifyContent: "space-between",
        }}
      >
        <Button type="primary" onClick={() => setMode("create")}>
          Create User
        </Button>
        <Input
          placeholder="Search by name or email"
          value={search}
          onChange={handleSearchChange}
          style={{ width: 300 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
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
