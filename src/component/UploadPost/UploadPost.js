import { Button, Card, Form, Input, Upload } from "antd";
import React, { useState } from "react";
import "./UploadPost.scss";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../../action/postAction";
import Loadingg from "../Loadingg/Loadingg";

const UploadPost = () => {
  const [selectedFileList, setSelectedFileList] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.postReducer.loading);
  const handleUpload = (newFileList) => {
    setSelectedFileList(newFileList.fileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 2000);
  };
  const onFinish = (values) => {
    const data = {
      ...values,
      image: selectedFileList.map((val) => val.originFileObj),
    };
    dispatch(post(data));
  };
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const validateMessages = {
    required: "${label} is required!",
  };
  return (
    <div className="UploadPost">
      <Header />
      {loading ? (
        <Loadingg />
      ) : (
        <div className="container">
          <Card style={{ width: "100%", marginTop: "100px" }}>
            <h1>POST</h1>
            <Form
              {...layout}
              validateMessages={validateMessages}
              onFinish={onFinish}
            >
              <Form.Item name="image" label="Image">
                <Upload
                  fileList={selectedFileList}
                  listType="picture-card"
                  onChange={handleUpload}
                  customRequest={dummyRequest}
                  onPreview={onPreview}
                >
                  {"+ Upload"}
                </Upload>
              </Form.Item>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={5} />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  Post
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UploadPost;
