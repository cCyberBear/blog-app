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

const { Meta } = Card;
const Apost = () => {
  return (
    <div className="Apost">
      <Card
        style={{ width: "100%" }}
        cover={
          <Carousel>
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          </Carousel>
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
          <FullscreenOutlined key="view all" />,
        ]}>
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title="Author name"
          description={
            <div className="content">
              <strong> Duy </strong> Ipsum is simply dummy text of the printing
              and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer
              took a galley of type and scrambled it to make a type specimen
              book. It has survived not only five centuries, but also the leap
              into electronic typesetting, remaining essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default Apost;
