import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredTasks } from "../store/slices/taskSlice";
import { RootState, AppDispatch } from "../store/store";
import { Input, DatePicker, Select, Table, Switch, Button } from "antd";
import { ColumnType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment, { Moment } from "moment";
import { Task, TaskTableProps } from "../interfaces/taskInterface";

const TasksPage: React.FC<TaskTableProps> = ({ setMode, setData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error, totalRecords } = useSelector(
    (state: RootState) => state.tasks
  );

  const [filters, setFilters] = useState({
    taskName: "",
    startDate: undefined as string | undefined,
    endDate: undefined as string | undefined,
    userId: "",
  });

  useEffect(() => {
    dispatch(fetchFilteredTasks(filters));
  }, [filters, dispatch]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDateChange = (
    key: "startDate" | "endDate",
    date: Moment | null
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: date ? date.format("YYYY-MM-DD") : undefined,
    }));
  };

  const handleEdit = (user: Task) => {
    setMode("edit");
    setData(user);
  };

  const columns: ColumnType<Task>[] = [
    {
      title: "Task Name",
      dataIndex: "taskName",
      key: "taskName",
    },
    {
      title: "Assigned User",
      dataIndex: "assignedUser",
      key: "assignedUser",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: 120,
      render: (text: string) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      width: 120,
      render: (text: string) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Enable/Disable",
      dataIndex: "isEnabled",
      key: "isEnabled",
      width: 150,
      align: "center",
      render: (text: boolean, record: any) => <Switch checked={text} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: any) => (
        <div>
          {" "}
          <Button
            icon={<EditOutlined />}
            style={{ marginRight: "10px" }}
            onClick={() => handleEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleEdit(record)}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Button
          type="primary"
          onClick={() => setMode("create")}
          style={{ marginRight: "10px" }}
        >
          Create Task
        </Button>
        <Input
          placeholder="Filter by Task Name"
          value={filters.taskName}
          onChange={(e) => handleFilterChange("taskName", e.target.value)}
          style={{ width: 200, marginRight: "10px" }}
        />
        <DatePicker
          placeholder="Start Date"
          value={filters.startDate ? moment(filters.startDate) : null}
          onChange={(date) => handleDateChange("startDate", date)}
          style={{ marginRight: "10px" }}
        />
        <DatePicker
          placeholder="End Date"
          value={filters.endDate ? moment(filters.endDate) : null}
          onChange={(date) => handleDateChange("endDate", date)}
          style={{ marginRight: "10px" }}
        />
        <Select
          placeholder="Assign User"
          value={filters.userId}
          onChange={(value) => handleFilterChange("userId", value)}
          style={{ width: 200 }}
        >
          <Select.Option value="1">User 1</Select.Option>
          <Select.Option value="2">User 2</Select.Option>
          <Select.Option value="3">User 3</Select.Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={tasks}
        loading={loading}
        rowKey="_id"
        scroll={{ y: 450 }}
        pagination={{
          total: totalRecords,
          pageSize: 10,
          onChange: () => {
            dispatch(fetchFilteredTasks(filters));
          },
        }}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
        }}
      />

      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default TasksPage;
