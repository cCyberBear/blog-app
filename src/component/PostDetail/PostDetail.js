import { CommentOutlined, LikeOutlined } from "@ant-design/icons";
import moment from "moment";
import { Button, Comment, Form, List, Input, Card, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import "./PostDetail.scss";
import { Carousel } from "antd";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments,
  sendComment,
  setCurrentPost,
} from "../../action/postAction";
import AvatarByName from "../AvatarByName/AvatarByName";
import parseISOString from "../../assets/format/time";

const { Meta } = Card;
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
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);
const PostDetail = () => {
  const { id } = useParams();
  const currentPost = useSelector((state) => state.postReducer.currentPost);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const commentsNew = useSelector((state) => state.postReducer.comments);
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const loading_2 = useSelector((state) => state.postReducer.loading_2);

  useEffect(() => {
    dispatch(setCurrentPost(id));
    dispatch(getComments(id));
  }, []);
  useEffect(() => {
    setComments(commentsNew);
  }, [commentsNew]);
  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    dispatch(
      sendComment({
        postId: id,
        comment: value,
        userId: currentUser._id,
      })
    );
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments([
        ...comments,
        {
          author: currentUser.username,
          avatar: <AvatarByName name={currentUser.username} />,
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
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
            loading_2 ? (
              <Skeleton.Image />
            ) : (
              <Carousel>
                {currentPost
                  ? currentPost.image.map((val) => (
                      <div className="img">
                        <img key={val} src={val} alt="postImage" />
                      </div>
                    ))
                  : ""}
              </Carousel>
            )
          }
        >
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
            {loading_2 ? (
              <Skeleton active avatar paragraph={{ rows: 4 }} />
            ) : (
              // <h1>cc</h1>
              <Meta
                avatar={
                  <AvatarByName
                    name={currentPost ? currentPost.author.username : "hihi"}
                  />
                }
                title={
                  <>
                    <p className="mg0">
                      {currentPost
                        ? currentPost.author.username.toUpperCase()
                        : ""}
                    </p>
                    <p className="cl-second">
                      {currentPost ? parseISOString(currentPost.createdAt) : ""}
                    </p>
                    <p className="mg0 cl-first">
                      {currentPost ? currentPost.title.toUpperCase() : ""}
                    </p>
                  </>
                }
                description={
                  <p>{currentPost ? currentPost.description : ""}</p>
                }
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
