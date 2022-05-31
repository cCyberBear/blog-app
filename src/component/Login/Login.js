import { Button, Card, Form, Input } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../action/userActions";
import "./Login.scss";

const Login = () => {
  const loading = useSelector((state) => state.userReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(login(values));
  };

  return (
    <div className="Login">
      <Card
        title="LOGIN"
        bordered={false}
        style={{ width: 350, display: "block" }}>
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
            <Button
              loading={loading}
              type="primary"
              style={{ width: "100%" }}
              htmlType="submit">
              LOGIN
            </Button>
          </Form.Item>
          <div className="create">
            <span className="font-medium">Don't have an account?</span>
            <p onClick={() => navigate("/register")}>Create an account</p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
