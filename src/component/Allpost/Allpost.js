import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../action/postAction";
import Apost from "../Apost/Apost";
import "./Allpost.scss";
const Allpost = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer.posts);
  const searchList = useSelector((state) => state.postReducer.searchList);

  useEffect(() => {
    dispatch(getPost());
  }, []);

  return (
    <div className="Allpost">
      {!searchList.length
        ? posts.map((val) => <Apost value={val} />)
        : searchList.map((val) => <Apost value={val} />)}
    </div>
  );
};

export default Allpost;
