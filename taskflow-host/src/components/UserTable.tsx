import React, { useEffect, useState, useMemo } from "react";
import { Table, Switch, Tooltip, Button, Popover } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/slices/userSlice";
import { RootState, AppDispatch } from "../store/store";
import { User, UserTableProps } from "../interfaces/userInterface";

const UserTable: React.FC<UserTableProps> = ({ setMode, setData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { usersByPage, totalRecords, loading } = useSelector(
    (state: RootState) => state.users
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [tableHeight, setTableHeight] = useState(window.innerHeight - 200);
  const [pageSize, setPageSize] = useState(Math.floor(tableHeight / 65));
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  useEffect(() => {
    if (!usersByPage[currentPage]) {
      dispatch(fetchUsers({ page: currentPage, limit: pageSize }));
    }
  }, [currentPage, pageSize, dispatch, usersByPage]);

  useEffect(() => {
    const updateTableHeight = () => {
      setTableHeight(window.innerHeight - 200);
    };

    window.addEventListener("resize", updateTableHeight);
    updateTableHeight();
    return () => window.removeEventListener("resize", updateTableHeight);
  }, []);

  useEffect(() => {
    setPageSize(Math.floor(tableHeight / 65));
  }, [tableHeight]);

  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setCurrentPage(current);

    if (!usersByPage[current]) {
      dispatch(fetchUsers({ page: current, limit: pageSize }));
    }
  };

  const handleToggleStatus = (checked: boolean, userId: string) => {
    console.log(`User ${userId} is now ${checked ? "Enabled" : "Disabled"}`);
    // Dispatch an action or API call to update status
  };

  const handleEditUser = (user: User) => {
    setMode("edit");
    setData(user);
    setSelectedRow(user._id);
    console.log(`Edit user: ${user._id}`);
  };

  const handleDeleteUser = (userId: string) => {
    setMode("view");
    setSelectedRow(null);
    console.log(`Delete user: ${userId}`);
  };

  const handleAddUser = () => {
    setMode("create");
  };

  const handleFilter = () => {
    console.log("Open filter options...");
    // Implement filter logic
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <span
          style={{ margin: 0, flex: 1, textAlign: "center", fontSize: "32" }}
        >
          Users
        </span>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddUser}
          >
            Add New User
          </Button>
          <Button icon={<FilterOutlined />} onClick={handleFilter}>
            Filter
          </Button>
        </div>
      </div>
      <Table
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text: string, record: User) =>
              `${record.firstName} ${record.lastName}`,
          },
          {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (text: string, record: User) => {
              const role = record.role;
              return role.charAt(0).toUpperCase() + role.slice(1);
            },
          },
          {
            title: "Telephone",
            dataIndex: "telephone",
            key: "telephone",
            render: (text: string, record: User) => `${record.mobileNumber}`,
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Actions",
            key: "actions",
            render: (_, record: User) => (
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Tooltip
                  title="Enable/Disable User"
                  overlayStyle={{ fontSize: "12px", padding: "4px 6px" }}
                >
                  <Switch
                    size="small"
                    checked={record.isEnabled}
                    onChange={(checked) =>
                      handleToggleStatus(checked, record._id)
                    }
                  />
                </Tooltip>
                <Tooltip
                  title="Edit"
                  overlayStyle={{ fontSize: "12px", padding: "4px 6px" }}
                >
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleEditUser(record)}
                  />
                </Tooltip>
                <Tooltip
                  title="Delete"
                  overlayStyle={{ fontSize: "12px", padding: "4px 6px" }}
                >
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteUser(record._id)}
                  />
                </Tooltip>
              </div>
            ),
          },
        ]}
        dataSource={usersByPage[currentPage] || []}
        pagination={{
          total: totalRecords,
          pageSize,
          current: currentPage,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
          onChange: (page, size) => {
            setCurrentPage(page);
            setTableHeight(window.innerHeight - 200);
          },
        }}
        loading={loading}
        onChange={handleTableChange}
        rowKey="id"
        rowClassName={(record: User) =>
          record._id === selectedRow ? "highlight-row" : ""
        }
      />
    </div>
  );
};

export default UserTable;
