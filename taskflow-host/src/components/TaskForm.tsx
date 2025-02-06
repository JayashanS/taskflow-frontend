import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { createTask, editTask } from "../store/slices/taskSlice"; // Assuming you have these actions
import { Form, Input, Button, DatePicker, Switch, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { TaskFormProps } from "../interfaces/taskInterface"; // Assuming the TaskFormProps interface is in a file named taskInterface.ts
import dayjs from "dayjs";

const TaskForm: React.FC<TaskFormProps> = ({ mode, data, setMode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (mode === "edit" && data) {
      form.setFieldsValue({
        taskName: data.taskName,
        description: data.description,
        startDate: dayjs(data.startDate), // Convert to dayjs object
        endDate: dayjs(data.endDate), // Convert to dayjs object
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

    message.success(
      `${mode === "create" ? "Task created" : "Task updated"} successfully!`
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
              { required: true, message: "Please input the assigned user!" },
            ]}
          >
            <Input />
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
