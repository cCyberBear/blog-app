import "./App.css";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";

import Main from "./component/Main/Main";
import PostDetail from "./component/PostDetail/PostDetail";
import UploadPost from "./component/UploadPost/UploadPost";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./action/userActions";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const authing = useSelector((state) => state.userReducer.authing);
  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getCurrentUser(token, navigate));
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            authing ? <h1>authing</h1> : !currentUser ? <Login /> : <Main />
          }></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <UploadPost />
            </PrivateRoute>
          }></Route>
        <Route
          path="/post/:id"
          element={
            <PrivateRoute>
              <PostDetail />
            </PrivateRoute>
          }></Route>
      </Routes>
    </div>
  );
}

export default App;
