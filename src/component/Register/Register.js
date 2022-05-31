import { Button, Card, Form, Input } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../action/userActions";
import "./Register.scss";
const Register = () => {
  const loading = useSelector((state) => state.userReducer.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    dispatch(register(values, navigate));
  };
  return (
    <div className="Register">
      <Card
        title="REGISTER"
        bordered={false}
        style={{ width: 350, display: "block" }}>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Username is required!",
              },
            ]}>
            <Input />
          </Form.Item>
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
              REGISTER
            </Button>
          </Form.Item>
          <div className="create">
            <span className="font-medium">Already have an account?</span>
            <p onClick={() => navigate("/")}>Login here</p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
