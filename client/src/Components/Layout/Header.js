import React, { Component } from "react";
import { HeaderWrapper, Logo } from "./layout.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import BtnBoard from "./BtnBoard";

const LeftMenu = ({}) => (
  <div>
    <ul>
      <li>
        <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
          Trang chủ
        </Link>
      </li>
      <li>
        <Link to="/boards " style={{ textDecoration: "none", color: "#fff" }}>
          Bảng
        </Link>
      </li>
      <li className="search">
        <input type="text" />
        <FontAwesomeIcon color="#FFF" icon="search" />{" "}
      </li>
    </ul>
  </div>
);

const RightMenu = ({}) => (
  <div>
    <ul>
      <BtnBoard />

      <li>
        <FontAwesomeIcon color="#FFF" icon="bell" />
      </li>
      <li>DL</li>
    </ul>
  </div>
);

class Header extends Component {
  render() {
    return (
      <HeaderWrapper>
        <LeftMenu />
        <Logo> Trallo</Logo>
        <RightMenu />
      </HeaderWrapper>
    );
  }
}

export default Header;
