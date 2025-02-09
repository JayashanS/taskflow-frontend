import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilteredTasksByUserEmail,
  updateCompletionDate,
} from "host/taskSlice";
import { setMessage } from "host/messageSlice";

import { RootState, AppDispatch } from "host/store";
import useAuth from "host/useAuth";
import {
  Input,
  DatePicker,
  Table,
  Button,
  Modal,
  Switch,
  Popconfirm,
} from "antd";
import { ColumnType } from "antd/es/table";
import moment, { Moment } from "moment";
import { Task } from "../interfaces/taskInterface";

const TasksPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, totalRecords } = useSelector(
    (state: RootState) => state.tasks
  );
  const { user } = useAuth();

  const [filters, setFilters] = useState({
    email: "",
    taskName: "",
    startDate: undefined as string | undefined,
    endDate: undefined as string | undefined,
    status: "inProgress",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [completionDate, setCompletionDate] = useState<Moment | null>(null);

  useEffect(() => {
    if (filters.email) {
      dispatch(fetchFilteredTasksByUserEmail(filters));
    }
  }, [filters, dispatch]);

  useEffect(() => {
    handleFilterChange("email", user.email);
  }, [user.email]);

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

  const handleCompletionDateChange = (date: Moment | null) => {
    setCompletionDate(date);
  };

  const showModal = (taskId: string) => {
    setCurrentTaskId(taskId);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      if (currentTaskId && completionDate) {
        await dispatch(
          updateCompletionDate({
            taskId: currentTaskId,
            completionDate: completionDate.format("YYYY-MM-DD"),
          })
        );
        await dispatch(fetchFilteredTasksByUserEmail(filters));
        dispatch(
          setMessage({
            content: "Task status updated successfully!",
            type: "success",
          })
        );
        setIsModalVisible(false);
        setCompletionDate(null);
      }
    } catch (error) {
      dispatch(
        setMessage({
          content: "Failed to update task",
          type: "error",
        })
      );
    }
  };

  const handleResetCompletionDate = async (taskId: string) => {
    try {
      await dispatch(
        updateCompletionDate({
          taskId: taskId,
          completionDate: "",
        })
      );
      await dispatch(fetchFilteredTasksByUserEmail(filters));
      dispatch(
        setMessage({
          content: "Task marked as not completed.",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        setMessage({
          content: "Failed to reset task completion status",
          type: "error",
        })
      );
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCompletionDate(null);
  };

  const columns: ColumnType<Task>[] = [
    {
      title: "Task Name",
      dataIndex: "taskName",
      key: "taskName",
      width: 250,
    },
    {
      title: "Assigned User",
      dataIndex: "assignedUserName",
      key: "assignedUserName",
      width: 250,
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
    ...(filters.status === "completed"
      ? [
          {
            title: "Completion Date",
            dataIndex: "completionDate",
            key: "completionDate",
            width: 150,
            render: (text: string) => moment(text).format("YYYY-MM-DD"),
          },
        ]
      : []),
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        if (filters.status === "completed") {
          return (
            <>
              <Button onClick={() => showModal(record._id)}>Update</Button>
              <Popconfirm
                title="Are you sure you want to reset the completion date?"
                onConfirm={() => handleResetCompletionDate(record._id)}
                okText="Yes"
                cancelText="No"
                overlayStyle={{
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                }}
              >
                <Button style={{ marginLeft: "10px" }}>Reset</Button>
              </Popconfirm>
            </>
          );
        } else {
          return (
            <Button onClick={() => showModal(record._id)}>Complete</Button>
          );
        }
      },
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Input.Search
          placeholder="Search by Task Name"
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
          onChange={(checked: any) =>
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
            dispatch(fetchFilteredTasksByUserEmail(filters));
          },
        }}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
        }}
      />

      <Modal
        title="Select Completion Date"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
      >
        <DatePicker
          value={completionDate}
          onChange={handleCompletionDateChange}
          style={{ width: "100%" }}
        />
      </Modal>
    </div>
  );
};

export default TasksPage;
