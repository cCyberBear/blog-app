import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Menu, PageHeader, Input } from "antd";
import React, { useState } from "react";
import AvatarByName from "../AvatarByName/AvatarByName";
import "./Header.scss";

const { Search } = Input;
const Header = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const onSearch = (value) => console.log(value);
  return (
    <div className="Header">
      <Drawer
        title={
          <div className="user">
            <p>name</p>
            <AvatarByName name="Khuong Duyy" />
          </div>
        }
        placement="right"
        onClose={onClose}
        visible={visible}>
        <Menu style={{ width: "100%" }}>
          <Menu.Item>item 1</Menu.Item>
          <Menu.Item>item 2</Menu.Item>
        </Menu>
      </Drawer>
      <PageHeader
        title="LOGO"
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
