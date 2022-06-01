import {
  ConsoleSqlOutlined,
  LogoutOutlined,
  MenuOutlined,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Menu, PageHeader, Input } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearch } from "../../action/postAction";
import { logOut } from "../../action/userActions";
import AvatarByName from "../AvatarByName/AvatarByName";
import "./Header.scss";

const { Search } = Input;
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const handleUpload = () => {
    navigate("/upload");
    onClose();
  };
  const handleLogout = () => {
    onClose();
    dispatch(logOut(navigate));
  };
  const onSearch = (value) => {
    dispatch(setSearch(value));
  };
  return (
    <div className="Header">
      <Drawer
        title={
          <div className="user">
            <p>{currentUser.username.toUpperCase()}</p>
            <AvatarByName name={currentUser.username} />
          </div>
        }
        placement="right"
        onClose={onClose}
        visible={visible}>
        <Menu mode="inline" style={{ width: "100%" }}>
          <Menu.Item onClick={handleUpload} icon={<UploadOutlined />}>
            Upload Post
          </Menu.Item>
          <Menu.Item icon={<ConsoleSqlOutlined />}>Manage</Menu.Item>
          <Menu.Item icon={<SettingOutlined />}>Setting</Menu.Item>
          <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Drawer>
      <PageHeader
        title={<h2 onClick={() => navigate("/")}>LOGO</h2>}
        extra={[
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />,
          <Button onClick={showDrawer} key="register" type="primary">
            <MenuOutlined />
          </Button>,
        ]}
      />
    </div>
  );
};

export default Header;
