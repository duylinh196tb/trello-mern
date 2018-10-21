import React, { Component } from "react";
import { Modal } from "antd";
import { logout } from "../../redux/actions/auth";
import { connect } from "react-redux";

const init = { visible: false };

class User extends Component {
  state = init;

  render() {
    return (
      <React.Fragment>
        <li onClick={() => this.props.logout()}>Đăng xuất </li>;
        <Modal
          title={"Thông tin tài khoản"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          width={800}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { logout }
)(User);
