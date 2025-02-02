import React, { useEffect, useState, useMemo } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/slices/userSlice";
import { RootState, AppDispatch } from "../store/store";

const UserTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { usersByPage, totalRecords, loading } = useSelector(
    (state: RootState) => state.users
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [tableHeight, setTableHeight] = useState(window.innerHeight - 200);
  //const pageSize = useMemo(() => Math.floor(tableHeight / 55), [tableHeight]);
  const [pageSize, setPageSize] = useState(Math.floor(tableHeight / 55));

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
    setPageSize(Math.floor(tableHeight / 55));
  }, [tableHeight]);

  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setCurrentPage(current);

    if (!usersByPage[current]) {
      dispatch(fetchUsers({ page: current, limit: pageSize }));
    }
  };

  return (
    <Table
      columns={[
        {
          title: "User Name",
          dataIndex: "username",
          key: "username",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
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
    />
  );
};

export default UserTable;
