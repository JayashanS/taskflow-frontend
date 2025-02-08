import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilteredTasks,
  deleteTask,
  toggleTaskStatus,
} from "host/taskSlice";
import { setMessage } from "host/messageSlice";
import { RootState, AppDispatch } from "host/store";
import { Input, DatePicker, Table, Switch, Button, Popconfirm } from "antd";
import { ColumnType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment, { Moment } from "moment";
import { Task, TaskTableProps } from "host/taskInterface";

const TaskTable: React.FC<TaskTableProps> = ({ setMode, setData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error, totalRecords } = useSelector(
    (state: RootState) => state.tasks
  );

  const [filters, setFilters] = useState({
    taskName: "",
    startDate: undefined as string | undefined,
    endDate: undefined as string | undefined,
    userId: "",
    status: "inProgress",
  });
  const [loadingTaskId, setLoadingTaskId] = useState<string | null>(null);

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
  const handleDelete = (taskId: string) => {
    dispatch(deleteTask(taskId))
      .then(() => {
        dispatch(
          setMessage({
            content: "Task deleted successfully!",
            type: "success",
          })
        );
      })
      .catch(() => {
        dispatch(
          setMessage({
            content: "Failed to delete task",
            type: "error",
          })
        );
      });
  };

  const handleToggleStatus = async (taskId: string) => {
    setLoadingTaskId(taskId);
    const updatedTasks = tasks.map((task: any) =>
      task._id === taskId ? { ...task, isEnabled: !task.isEnabled } : task
    );
    dispatch({ type: "tasks/setTasks", payload: updatedTasks });
    try {
      await dispatch(toggleTaskStatus(taskId)).unwrap();
      dispatch(
        setMessage({
          content: "Task status updated successfully!",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        setMessage({
          content: "Failed to update task status.",
          type: "error",
        })
      );
    } finally {
      setLoadingTaskId(null);
    }
  };

  const columns: ColumnType<Task>[] = [
    {
      title: "Task Name",
      dataIndex: "taskName",
      key: "taskName",
    },
    {
      title: "Assigned User",
      dataIndex: "assignedUserName",
      key: "assignedUserName",
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
      align: "center" as "center",
      render: (isEnabled: boolean, record: any) => (
        <Switch
          checked={isEnabled}
          onChange={() => handleToggleStatus(record._id)}
          loading={loadingTaskId === record._id}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: any) => (
        <div>
          <Button
            icon={<EditOutlined />}
            style={{ marginRight: "10px" }}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this task?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            overlayStyle={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
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

        <Input.Search
          placeholder="Serch by Task Name"
          value={filters.taskName}
          onChange={(e) => handleFilterChange("taskName", e.target.value)}
          style={{ width: 300, marginRight: "10px" }}
          enterButton
          allowClear
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
        <Switch
          checked={filters.status === "completed"}
          onChange={(checked) =>
            handleFilterChange("status", checked ? "completed" : "inProgress")
          }
          checkedChildren="Completed"
          unCheckedChildren="In Progress"
          style={{ marginLeft: "10px" }}
        />
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

export default TaskTable;
