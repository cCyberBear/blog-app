import { Button, Card, Form, Input } from "antd";
import React from "react";
import "./Login.scss";

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className="Login">
      <Card
        title="LOGIN"
        bordered={false}
        style={{ width: 350, display: "block" }}>
        <h1>LOGO</h1>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Invalid e-mail!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" style={{ width: "100%" }} htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
