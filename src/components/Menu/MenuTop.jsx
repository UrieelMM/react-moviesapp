import React from "react";
import "./Menu.scss";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/original.svg";

const MenuTop = () => {
  return (
    <div className="menu-top">
      <div className="menu-top__logo">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/news-movies">Nuevas Películas</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/popular">Populares</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/search">Buscar</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MenuTop;
