import React, { Component } from "react";
import { HeaderWrapper, Logo } from "./layout.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import BtnBoard from "./BtnBoard";
import BtnLogin from "./BtnLogin";
import { connect } from "react-redux";
import User from "./User";

const LeftMenu = ({}) => (
  <div>
    <ul>
      <li style={{ opacity: 0 }} />
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

const RightMenu = ({ userName }) => (
  <div>
    <ul>
      <li style={{ opacity: 0 }} />
      <BtnBoard />

      <li>
        <FontAwesomeIcon color="#FFF" icon="bell" />
      </li>
      {userName ? <User userName={userName} /> : <BtnLogin />}
    </ul>
  </div>
);

class Header extends Component {
  render() {
    return (
      <HeaderWrapper>
        <LeftMenu />
        <Logo> Trallo</Logo>
        <RightMenu userName={this.props.userName} />
      </HeaderWrapper>
    );
  }
}

export default connect(
  state => ({
    userName: state.Auth.name
  }),
  {}
)(Header);
