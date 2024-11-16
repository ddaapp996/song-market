import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Image, Layout, Menu, theme } from "antd";
import logo from "./logo.svg";
import { useNavigate } from "react-router-dom";
import { Products } from "../components/admins/products";

const { Header, Sider, Content, Footer } = Layout;
export const AdminLayout = ({ setContent, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [seq, setSeq] = useState(0);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    setSeq(seq + 1);
  }, [seq]);

  return (
    <Layout>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="w-full flex items-center justify-center py-5 px-2">
          <Image
            src={logo}
            alt="Tech lab"
            preview={false}
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Sản phẩm",
              onClick: () => {
                setSeq(seq + 1);
                setContent(<Products seq={seq} setSeq={setSeq} />);
              },
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Users",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Others",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
        <Footer
          style={{
            textAlign: "left",
          }}
          className="w-full border-t border-gray-300"
        >
          &copy; Music Market {new Date().getFullYear()}. All Right Reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};
