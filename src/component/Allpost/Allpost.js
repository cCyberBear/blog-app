import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../action/postAction";
import Apost from "../Apost/Apost";
import "./Allpost.scss";
const Allpost = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer.posts);
  useEffect(() => {
    dispatch(getPost());
  }, []);

  return (
    <div className="Allpost">
      {posts.map((val) => (
        <Apost value={val} />
      ))}
    </div>
  );
};

export default Allpost;
