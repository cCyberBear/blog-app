import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../action/postAction";
import Apost from "../Apost/Apost";
import { Card, Skeleton } from "antd";
import "./Allpost.scss";
const Allpost = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer.posts);
  const searchList = useSelector((state) => state.postReducer.searchList);
  const loading = useSelector((state) => state.postReducer.loading);
  useEffect(() => {
    dispatch(getPost());
  }, []);

  return (
    <div className="Allpost">
      {loading ? (
        <div style={{ margin: "0 20px 20px 20px" }}>
          <Card style={{ width: "100%" }} cover={<Skeleton.Image />}>
            <Skeleton active avatar paragraph={{ rows: 4 }} />
          </Card>
        </div>
      ) : !searchList.length ? (
        posts.map((val) => <Apost value={val} />)
      ) : (
        searchList.map((val) => <Apost value={val} />)
      )}
    </div>
  );
};

export default Allpost;
