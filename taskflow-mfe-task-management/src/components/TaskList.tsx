import React, { useState } from "react";
import { Card, Switch, Typography, Row, Col, Divider, Button } from "antd";

// Sample ITask type definition
interface ITask {
  _id: string;
  taskName: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  assignedUser: string;
  isEnabled: boolean;
}

const { Title, Text } = Typography;

const TaskList: React.FC = () => {
  // Sample data for tasks
  const [taskList, setTaskList] = useState<ITask[]>([
    {
      _id: "1",
      taskName: "Task 1",
      description: "This is a description of task 1.",
      startDate: new Date("2025-02-05"),
      endDate: new Date("2025-02-10"),
      assignedUser: "User1",
      isEnabled: true,
    },
    {
      _id: "2",
      taskName: "Task 2",
      description: "This is a description of task 2.",
      startDate: new Date("2025-02-06"),
      endDate: new Date("2025-02-12"),
      assignedUser: "User2",
      isEnabled: false,
    },
  ]);

  const handleEnableToggle = (taskId: string, enabled: boolean) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, isEnabled: enabled } : task
      )
    );
  };

  return (
    <div style={{ width: "53.5vw", maxHeight: "70vh", overflow: "auto" }}>
      {taskList.map((task) => (
        <Card
          key={task._id}
          style={{
            marginBottom: 16,
            top: "0",
            borderRadius: "5px",
            height: "130px",
          }}
        >
          <Row justify="space-between" gutter={[8, 4]}>
            <Col span={12}>
              <Title level={5} style={{ marginBottom: "4px" }}>
                {task.taskName}
              </Title>
              {task.description && (
                <Text type="secondary" style={{ fontSize: "14px" }}>
                  {task.description.length > 60
                    ? `${task.description.substring(0, 60)}...`
                    : task.description}
                </Text>
              )}
            </Col>

            <Col span={12} style={{ textAlign: "right" }}>
              <Row justify="end" align="middle">
                <Text type="secondary" style={{ fontSize: "14px" }}>
                  {new Date(task.startDate).toLocaleDateString()} -{" "}
                  {new Date(task.endDate).toLocaleDateString()}
                </Text>
                <Switch
                  size="small"
                  checked={task.isEnabled}
                  onChange={(checked) => handleEnableToggle(task._id, checked)}
                  style={{ marginLeft: "12px" }}
                />
              </Row>
            </Col>
          </Row>

          <Divider style={{ margin: "8px 0" }} />

          <Row justify="space-between" align="middle">
            <Col>
              <Text type="secondary" style={{ fontSize: "14px" }}>
                Assigned User: {task.assignedUser}
              </Text>
            </Col>

            <Col>
              <Button
                type="link"
                size="small"
                onClick={() => alert(`More details for ${task.taskName}`)}
              >
                More
              </Button>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
