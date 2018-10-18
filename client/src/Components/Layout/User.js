import React, { Component } from "react";
import { Modal } from "antd";

const init = { visible: false };

class User extends Component {
  state = init;

  render() {
    return (
      <React.Fragment>
        <li>{this.props.userName}</li>;
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

export default User;
