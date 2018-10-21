import React, { Component } from "react";
import { Modal, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import imgLogin from "../../scss/images/login.png";
import styled from "styled-components";
import { actPromise } from "../../helper";
import { login, register } from "../../redux/actions/auth";
import {
  TitleWrapper,
  ModalWrapper,
  InputWrapper,
  ButtonLogin
} from "./layout.style";

const TitleForm = ({ login, handleClick }) => (
  <TitleWrapper>
    <div
      onClick={() => handleClick(true)}
      style={{ color: login ? "#55ACEF" : "black" }}
    >
      ĐĂNG NHẬP{" "}
    </div>
    <strong> / </strong>
    <div
      onClick={() => handleClick(false)}
      style={{ color: !login ? "#55ACEF" : "black" }}
    >
      {" "}
      ĐĂNG KÝ
    </div>
  </TitleWrapper>
);

const initial = {
  visible: false,
  email: "tbjerry196@gmail.com",
  password: "16210179",
  password2: "",
  isLogin: true
};

class BtnLogin extends Component {
  state = {
    ...initial
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleSubmit = async e => {
    try {
      e.preventDefault();
      const { login, register } = this.props;
      const { email, password, password2, isLogin } = this.state;

      if (!email || !password) {
        message.warning("Cần điền đầy đủ các trường");
      }

      // Login
      if (isLogin && email && password) {
        const res = await actPromise(login, [{ email, password }]);
        if (res.code === 200) {
          // message.success("Đăng nhập thành công");
          this.setState(initial);
        }
        if (res.code === 404)
          return message.error("Sai tài khoản hoặc mật khẩu");
      }

      // Signup
      if (!isLogin && email && password && password2) {
        if (password !== password2)
          return message.warning("2 Mật khẩu phải trùng nhau");
        if (password.length < 6)
          return message.warning("Mật khẩu phải có ít nhất 6 ký tự");
        await actPromise(register, [{ email, password }]);
        // message.success("Đăng ký thành công");
        // this.setState(initial);
      }
    } catch (error) {
      // message.error(error.message);
      console.error(error);
    }
  };

  handleCancel = e => {
    this.setState(initial);
  };

  handleClick = d => {
    this.setState({ isLogin: d });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { isLogin, email, password, password2, name } = this.state;

    return (
      <React.Fragment>
        <li onClick={this.showModal}>Tài khoản</li>
        <Modal
          title={<TitleForm login={isLogin} handleClick={this.handleClick} />}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          width={800}
        >
          <ModalWrapper>
            <div>
              <img src={imgLogin} alt="" />
            </div>
            <form onSubmit={this.handleSubmit}>
              <InputWrapper>
                <FontAwesomeIcon icon="user" />
                <input
                  autoComplete="off"
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  placeholder="Tài khoản"
                />
              </InputWrapper>
              {/* {!isLogin ? (
                <InputWrapper>
                  <FontAwesomeIcon icon="user" />
                  <input
                    autoComplete="off"
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    placeholder="Tên hiển thị"
                  />
                </InputWrapper>
              ) : null} */}
              <InputWrapper>
                <FontAwesomeIcon icon="key" />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  placeholder="Password"
                />
              </InputWrapper>
              {isLogin ? (
                ""
              ) : (
                <InputWrapper>
                  <FontAwesomeIcon icon="key" />
                  <input
                    type="password"
                    name="password2"
                    value={password2}
                    onChange={this.handleChange}
                    placeholder="Nhập lại password"
                  />
                </InputWrapper>
              )}
              <ButtonLogin>{isLogin ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}</ButtonLogin>
            </form>
          </ModalWrapper>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { login, register }
)(BtnLogin);
