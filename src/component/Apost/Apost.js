import React from "react";
import "./Apost.scss";
import { Card, Carousel } from "antd";
import { FullscreenOutlined, LikeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AvatarByName from "../AvatarByName/AvatarByName";
import parseISOString from "../../assets/format/time";

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
          <FullscreenOutlined
            key="view all"
            onClick={() => navigate(`/post/${value._id}`)}
          />,
        ]}
      >
        <Meta
          avatar={<AvatarByName name={value.author.username} />}
          title={
            <>
              <p className="mg0">{value.author.username.toUpperCase()}</p>
              <p className="cl-second">{parseISOString(value?.createdAt)}</p>
              <p className="mg0 cl-first">{value?.title.toUpperCase()}</p>
            </>
          }
          description={<div className="content">{value.description}</div>}
        />
      </Card>
    </div>
  );
};

export default Apost;
