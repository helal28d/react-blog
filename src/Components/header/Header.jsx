import React from "react";
import "./Header.css";
export default function Header() {
  return (
    <div className="header">
      <div className="headrtitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img className="headerImg" src="./img/header.jpg" alt="" />
    </div>
  );
}
