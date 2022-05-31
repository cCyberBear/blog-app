import { CommentOutlined, LikeOutlined } from "@ant-design/icons";
import { Avatar, Button, Comment, Form, List, Input, Card } from "antd";
import React, { useState } from "react";
import "./PostDetail.scss";
import { Carousel } from "antd";
import Header from "../Header/Header";
const { Meta } = Card;
const contentStyle = {
  height: "560px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const { TextArea } = Input;
const CommentList = ({ style, comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);
const PostDetail = ({}) => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments([
        ...comments,
        {
          author: "Han Solo",
          avatar: "https://joeschmoe.io/api/v1/random",
          content: <p>{value}</p>,
        },
      ]);
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="PostDetail">
      <Header />
      <div className="container">
        <Card
          style={{ width: "100%", marginTop: "100px" }}
          cover={
            <Carousel>
              <div>
                <h3 style={contentStyle}>1</h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel>
          }>
          <div className="comment">
            <div className="flex-scope">
              <div className="flex-scope">
                <LikeOutlined key="like" />
                <p>{20}</p>
              </div>
              <div className="flex-scope">
                <CommentOutlined key="comment" />
                <p>{20}</p>
              </div>
            </div>
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description={
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, natus, saepe ad atque, reprehenderit hic libero
                  beatae tempora dolorum impedit illum! Vel, tempora vero?
                  Doloribus vero accusantium quibusdam harum cumque?
                </p>
              }
            />
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
              avatar={
                <Avatar
                  src="https://joeschmoe.io/api/v1/random"
                  alt="Han Solo"
                />
              }
              content={
                <Editor
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                  value={value}
                />
              }
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PostDetail;
