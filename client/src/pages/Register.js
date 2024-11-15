import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import { DashBoard } from "../layout/dashboard";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onRegister = async (values) => {
    setLoading(true);
    try {
      await registerUser(values);
      message.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      message.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashBoard showSearch={false}>
      <div className="flex items-center justify-center h-[75vh]">
        <div className="flex justify-center w-full text-lg">
          <Card title="Register Form" className="w-full md:w-[65%] lg:w-[35%]" hoverable>
            <Form name="register" onFinish={onRegister} layout="vertical">
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                  {
                    max: 50,
                    message: "Username should not exceed 50 characters",
                  },
                  { min: 5, message: "Username should min 5 characters" },
                ]}
              >
                <Input type="username" />
              </Form.Item>
              <Form.Item
                label="Email address"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    type: "email",
                    message: "Invalid email address",
                  },
                  {
                    max: 50,
                    message: "Email should not exceed 50 characters",
                  },
                ]}
              >
                <Input type="email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 8, message: "Password must have at least 8 characters" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <div className="flex flex-row items-center justify-end -mt-2 mb-6 mx-2">
                <a href="/login" style={{ color: "#1677ff" }}>
                  Have account, login now?
                </a>
              </div>

              <Form.Item className="flex justify-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="px-7"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </DashBoard>
  );
};

export default Register;
