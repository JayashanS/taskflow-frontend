import React, { useState } from "react";
import { Button, Input, Space, DatePicker, Select } from "antd";
import { PlusOutlined, FilterOutlined, MoreOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import TaskList from "./TaskList";

// Placeholder Task List Component
const InProgressTasksList: React.FC = () => (
  <div style={{ padding: "16px", background: "#f5f5f5", borderRadius: "8px" }}>
    <p>List of in-progress tasks will be displayed here...</p>
  </div>
);

const InProgressTab: React.FC = () => {
  const [filters, setFilters] = useState<{
    date: string | null;
    priority: string | undefined;
    user: string | undefined;
    search: string;
  }>({
    date: null,
    priority: undefined,
    user: undefined,
    search: "",
  });

  return (
    <div style={{ padding: "16px" }}>
      {/* Top Bar with Filters */}
      <Space
        style={{ marginBottom: "16px", display: "flex", flexWrap: "wrap" }}
      >
        {/* Create Task Button */}
        <Button type="primary" icon={<PlusOutlined />}>
          Create
        </Button>

        {/* Date Filter */}
        <DatePicker
          placeholder="Filter by date"
          onChange={(date) =>
            setFilters((prev) => ({
              ...prev,
              date: date ? dayjs(date).format("YYYY-MM-DD") : null,
            }))
          }
        />

        {/* Priority Filter */}
        <Select
          placeholder="Filter by priority"
          style={{ width: 150 }}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, priority: value }))
          }
          options={[
            { value: "high", label: "High" },
            { value: "medium", label: "Medium" },
            { value: "low", label: "Low" },
          ]}
        />

        {/* User Filter */}
        <Select
          placeholder="Filter by user"
          style={{ width: 150 }}
          onChange={(value) => setFilters((prev) => ({ ...prev, user: value }))}
          options={[
            { value: "user1", label: "User 1" },
            { value: "user2", label: "User 2" },
            { value: "user3", label: "User 3" },
          ]}
        />

        {/* Search Input */}
        <Input
          placeholder="Search tasks..."
          style={{ width: 200 }}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
        />

        {/* More Options */}
        <Button icon={<MoreOutlined />} />
      </Space>

      {/* Task List */}
      <TaskList />
    </div>
  );
};

export default InProgressTab;
