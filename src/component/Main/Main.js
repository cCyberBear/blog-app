import { Affix, Card } from "antd";
import React from "react";
import Allpost from "../Allpost/Allpost";
import Header from "../Header/Header";
import "./Main.scss";
const Main = () => {
  return (
    <div className="Main">
      <Header />
      <div className="container">
        <Allpost />
        <Affix offsetTop={80} style={{ width: "30%" }}>
          <Card
            title="Newest"
            bordered={false}
            style={{ width: "100%", marginTop: "20px" }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Affix>
      </div>
    </div>
  );
};

export default Main;
