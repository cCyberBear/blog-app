import { CommentOutlined, LikeOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Comment,
  Form,
  List,
  Input,
  Card,
  Skeleton,
} from "antd";
import React, { useEffect, useState } from "react";
import "./PostDetail.scss";
import { Carousel } from "antd";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPost } from "../../action/postAction";
import AvatarByName from "../AvatarByName/AvatarByName";
import parseISOString from "../../assets/format/time";

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
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentPost = useSelector((state) => state.postReducer.currentPost);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const loading = useSelector((state) => state.postReducer.loading);

  useEffect(() => {
    dispatch(setCurrentPost(id));
  }, []);

  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments([
        ...comments,
        {
          author: currentUser.username,
          avatar: <AvatarByName name={currentUser.username} />,
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
              {currentPost.image.map((val) => (
                <div className="img">
                  <img key={val} src={val} alt="postImage" />
                </div>
              ))}
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
            {!currentPost ? (
              <Skeleton avatar paragraph={{ rows: 4 }} />
            ) : (
              <Meta
                avatar={<AvatarByName name={currentPost.author.username} />}
                title={
                  <>
                    <p className="mg0">
                      {currentPost.author.username.toUpperCase()}
                    </p>
                    <p className="cl-second">
                      {parseISOString(currentPost?.createdAt)}
                    </p>
                    <p className="mg0 cl-first">
                      {currentPost?.title.toUpperCase()}
                    </p>
                  </>
                }
                description={<p>{currentPost?.description}</p>}
              />
            )}
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
              avatar={<AvatarByName name={currentUser.username} />}
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
