import React, { useState } from "react";
import "./Apost.scss";
import { Card, Avatar, Carousel } from "antd";
import {
  CommentOutlined,
  EditOutlined,
  EllipsisOutlined,
  FullscreenOutlined,
  LikeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import PostDetail from "../PostDetail/PostDetail";
import { useNavigate } from "react-router-dom";
import AvatarByName from "../AvatarByName/AvatarByName";

const { Meta } = Card;
const Apost = ({ value }) => {
  const navigate = useNavigate();
  return (
    <div className="Apost">
      <Card
        style={{ width: "100%" }}
        cover={
          value.image.length ? (
            <Carousel>
              {value.image.map((val) => (
                <div className="img">
                  <img key={val} src={val} alt="postImage" />
                </div>
              ))}
            </Carousel>
          ) : (
            ""
          )
        }
        actions={[
          <div className="like">
            <LikeOutlined key="like" />
            <p>{20}</p>
          </div>,
          <div className="like">
            <CommentOutlined key="comment" />
            <p>{20}</p>
          </div>,
          <FullscreenOutlined
            key="view all"
            onClick={() => navigate("/post/:id")}
          />,
        ]}
      >
        <Meta
          avatar={<AvatarByName name={value.author.username} />}
          title={value.author.username}
          description={<div className="content">{value.description}</div>}
        />
      </Card>
    </div>
  );
};

export default Apost;
