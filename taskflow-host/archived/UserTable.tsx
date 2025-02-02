import React, { useState, useEffect, useMemo } from "react";
import { Space, Table, Switch, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  name: string;
  taskCount: number;
  telephone: string;
  enabled: boolean;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Task Count",
    dataIndex: "taskCount",
    key: "taskCount",
  },
  {
    title: "Telephone",
    dataIndex: "telephone",
    key: "telephone",
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined />} type="link" />
        <Button icon={<DeleteOutlined />} type="link" danger />
        <Switch
          checked={record.enabled}
          onChange={(checked) =>
            console.log(`Switch to ${checked ? "Enabled" : "Disabled"}`)
          }
          checkedChildren={<CheckCircleOutlined />}
          unCheckedChildren={<CheckCircleOutlined />}
        />
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    taskCount: 5,
    telephone: "123-456-7890",
    enabled: true,
  },
  {
    key: "2",
    name: "Jim Green",
    taskCount: 3,
    telephone: "987-654-3210",
    enabled: false,
  },
  {
    key: "3",
    name: "Joe Black",
    taskCount: 7,
    telephone: "555-555-5555",
    enabled: true,
  },
];

const UserTable: React.FC = () => {
  const [tableHeight, setTableHeight] = useState(window.innerHeight - 200);

  useEffect(() => {
    const updateTableHeight = () => setTableHeight(window.innerHeight - 200);
    window.addEventListener("resize", updateTableHeight);
    return () => window.removeEventListener("resize", updateTableHeight);
  }, []);

  const pageSize = useMemo(() => Math.floor(tableHeight / 55), [tableHeight]);

  return (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      pagination={{ pageSize, responsive: true }}
      scroll={{ y: tableHeight }}
    />
  );
};

export default UserTable;
