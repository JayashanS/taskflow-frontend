import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "host/store";
import { createTask, editTask } from "host/taskSlice";
import { setMessage } from "host/messageSlice";
import { Form, Input, Button, DatePicker, Switch, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { TaskFormProps } from "host/taskInterface";
import { fetchAllUsers, User } from "../services/userService";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(weekday);
dayjs.extend(localeData);

const TaskForm: React.FC<TaskFormProps> = ({ mode, data, setMode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchAllUsers();
        setUsers(usersData);
      } catch (err) {
      } finally {
      }
    };
    loadUsers();
  }, []);
  useEffect(() => {
    if (mode === "edit" && data) {
      form.setFieldsValue({
        taskName: data.taskName,
        description: data.description,
        startDate: dayjs(data.startDate),
        endDate: dayjs(data.endDate),
        assignedUser: data.assignedUser,
        isEnabled: data.isEnabled,
      });
      setIsEnabled(data.isEnabled);
    }
  }, [mode, data, form]);

  const handleSubmit = async (values: any) => {
    values.isEnabled = isEnabled;
    if (mode === "create") {
      dispatch(createTask(values));
    } else if (mode === "edit" && data) {
      values._id = data._id;
      dispatch(editTask(values));
    }
    dispatch(
      setMessage({
        content: `${
          mode === "create" ? "Task created" : "Task updated"
        } successfully!`,
        type: "success",
      })
    );
    form.resetFields();
    setMode("view");
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
          {mode === "create" ? "Create Task" : "Edit Task"}
        </h3>
        <div></div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "30px 100px" }}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Task Name"
            name="taskName"
            rules={[{ required: true, message: "Please input the task name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[
              { required: true, message: "Please select the start date!" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: "Please select the end date!" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Assigned User"
            name="assignedUser"
            rules={[
              { required: true, message: "Please select the assigned user!" },
            ]}
          >
            <Select
              placeholder="Select a user"
              showSearch
              optionFilterProp="label"
              filterOption={(input, option) =>
                option
                  ? option.label.toLowerCase().includes(input.toLowerCase())
                  : false
              }
              options={users.map((user) => ({
                value: user._id,
                label: `${user.firstName} ${user.lastName}`,
              }))}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Is Enabled"
            name="isEnabled"
            valuePropName="checked"
          >
            <Switch onChange={setIsEnabled} checked={isEnabled} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {mode === "create" ? "Create Task" : "Update Task"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default TaskForm;
