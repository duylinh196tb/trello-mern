import React, { Component } from "react";
import { Modal, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { actCreateBoard } from "../../redux/actions/boards";

class BtnBoard extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      title: "",
      visible: true
    });
  };

  handleOk = async e => {
    this.props.actCreateBoard({
      title: this.state.title
    });
    this.setState({
      title: "",
      visible: false
    });
    console.log(this.state);
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      title: "",
      visible: false
    });
  };

  render() {
    return (
      <React.Fragment>
        <li onClick={this.showModal}>
          <FontAwesomeIcon color="#FFF" icon="plus" />
        </li>
        <Modal
          title="Thêm Bảng"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ width: 100 }}>Tên bảng</label>
            <Input
              placeholder=" Nhập tên bảng"
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
            />
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  {
    actCreateBoard
  }
)(BtnBoard);
