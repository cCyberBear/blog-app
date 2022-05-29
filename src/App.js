import logo from "./logo.svg";
import "./App.css";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import AvatarByName from "./component/AvatarByName/AvatarByName";
import { Avatar } from "antd";
import Apost from "./component/Apost/Apost";
import Allpost from "./component/Allpost/Allpost";
import Main from "./component/Main/Main";
import PostDetail from "./component/PostDetail/PostDetail";
import UploadPost from "./component/UploadPost/UploadPost";

function App() {
  return (
    <div className="App">
      <UploadPost />
    </div>
  );
}

export default App;
