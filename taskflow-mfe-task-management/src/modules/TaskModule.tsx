import React from "react";
import { SyncOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import InProgressTab from "../components/InProgressTab";

const CompletedTab: React.FC = () => <div>Tasks that are completed.</div>;

const TaskModule: React.FC = () => (
  <Tabs
    defaultActiveKey="1"
    items={[
      {
        key: "1",
        label: "In Progress",
        icon: <SyncOutlined />,
        children: <InProgressTab />,
      },
      {
        key: "2",
        label: "Completed",
        icon: <CheckCircleOutlined />,
        children: <CompletedTab />,
      },
    ]}
  />
);

export default TaskModule;
