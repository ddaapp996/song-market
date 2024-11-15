// File: src/pages/Login.js

import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import { DashBoard } from "../layout/dashboard";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const token = await loginUser(values.username, values.password);
      localStorage.setItem("authToken", token);
      message.success("Login successful!");
      navigate("/");
    } catch (error) {
      message.error("Invalid username or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashBoard showSearch={false}>
      <div className="flex items-center justify-center h-[75vh]">
        <div className="flex justify-center w-full text-lg">
          <Card title="Login Form" className="w-full md:w-[65%] lg:w-[35%]" hoverable>
            <Form onFinish={handleLogin}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username or email!" },
                ]}
              >
                <Input placeholder="Username or email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <div className="flex flex-row items-center justify-between -mt-2 mb-6 mx-2">
                <a href="/forgot-password" style={{color: '#1677ff'}}>Forgot Password?</a>
                <a href="/register" style={{color: '#1677ff'}}>Register</a>
              </div>

              <Form.Item className="flex justify-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="px-7"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </DashBoard>
  );
};

export default Login;
