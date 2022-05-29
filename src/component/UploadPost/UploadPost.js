import { Button, Card, Form, Input, Upload } from "antd";
import React, { useState } from "react";
import "./UploadPost.scss";
import Header from "../Header/Header";
import ImgCrop from "antd-img-crop";

const UploadPost = () => {
  const [selectedFileList, setSelectedFileList] = useState([]);

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
      // subCategory: JSON.stringify(values.subCategory),
    };
    console.log(data);
  };
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const validateMessages = {
    required: "${label} is required!",
  };
  return (
    <>
      <Header />
      <div className="UploadPost">
        <div className="container">
          <Card>
            <h1>POST</h1>
            <Form
              {...layout}
              validateMessages={validateMessages}
              onFinish={onFinish}>
              <Form.Item name="image" label="Image">
                <ImgCrop rotate>
                  <Upload
                    fileList={selectedFileList}
                    listType="picture-card"
                    onChange={handleUpload}
                    customRequest={dummyRequest}
                    onPreview={onPreview}>
                    {"+ Upload"}
                  </Upload>
                </ImgCrop>
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit">
                  Post
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default UploadPost;
