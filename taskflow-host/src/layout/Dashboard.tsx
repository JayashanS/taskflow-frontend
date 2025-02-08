import React from "react";
import { useDispatch } from "react-redux";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import useAuth from "../hooks/useAuth";
import Logo from "../assets/Logo";

const { Header, Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleLogout = () => {
    dispatch(logout());
  };
  const location = useLocation();
  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "black",
          backgroundColor: "white",
          borderBottom: "0.5px solid #f0f0f0",
          fontSize: "20px",
        }}
        className="responsive-padding"
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <img
            src={logo}
            alt="Logo"
            style={{
              width: 40,
              height: 40,
              marginRight: "10px",
              marginLeft: "5px",
            }}
          /> */}
          <Logo width={40} height={40} />
          <span style={{ marginLeft: "5px" }}>Task Flow</span>
        </div>
        <div>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Avatar
              size={40}
              style={{ backgroundColor: "#f0dbff", color: "#9003fc" }}
            >
              {user?.email ? user.email.charAt(0).toUpperCase() : ""}
            </Avatar>
          </Dropdown>
        </div>
      </Header>

      <Layout
        className="responsive-padding"
        style={{
          backgroundColor: "white",
        }}
      >
        <Sider
          width={200}
          style={{
            background: "#fff",
            height: "100vh",
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ height: "100%" }}
          >
            {user?.role == "admin" && (
              <Menu.Item key="/users" icon={<UserOutlined />}>
                <Link to="/users">Users</Link>
              </Menu.Item>
            )}
            <Menu.Item key="/tasks" icon={<FileTextOutlined />}>
              <Link to="/tasks">Tasks</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Content style={{ background: "#fff", padding: 10 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
