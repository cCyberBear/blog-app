import { Avatar } from "antd";
import React from "react";

const AvatarByName = ({ style, name }) => {
  const newName = name.toUpperCase() + " " + name.toUpperCase();
  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }
  function stringAvatar(name) {
    return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
  }
  return (
    <Avatar
      style={{
        backgroundColor: stringToColor(newName),
        verticalAlign: "middle",
        ...style,
      }}
      size="large">
      {stringAvatar(newName)}
    </Avatar>
  );
};

export default AvatarByName;
