import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, FileTextOutlined } from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./Dashboard.css";
import logo from "../assets/logo.png";

const { Header, Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  const location = useLocation();

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          color: "black",
          backgroundColor: "white",
          borderBottom: "0.5px solid #f0f0f0",
          fontSize: "20px",
        }}
        className="responsive-padding"
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: 40,
            height: 40,
            marginRight: "10px",
            marginLeft: "5px",
          }}
        />
        <span style={{ marginLeft: "5px" }}>Task Flow</span>
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
            <Menu.Item key="/users" icon={<UserOutlined />}>
              <Link to="/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="/tasks" icon={<FileTextOutlined />}>
              <Link to="/tasks">Tasks</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Content style={{ background: "#fcc", padding: 10 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
