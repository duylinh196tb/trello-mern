import React, { Component } from "react";
import styled from "styled-components";
import { WrapTags, Tag, Title, Button } from "./board.styled";
import { Icon } from "antd";
import { connect } from "react-redux";
import { actUpdateBoard } from "../../redux/actions/boards";

const initialState = {
  inputVisible: false,
  name: "",
  onEdit: "",
  editName: ""
};

class ListUsers extends Component {
  state = {
    inputVisible: false,
    addUser: "",
    onEdit: "",
    editName: ""
  };

  handleBlur = () => {
    this.setState(initialState);
  };

  handleInput = () => {
    this.input.focus();
    this.setState({ inputVisible: true });
  };

  addUser = () => {
    const { actUpdateBoard, token, board } = this.props;
    const { addUser } = this.state;
    actUpdateBoard(token, { addUser }, board._id);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handKeyPress = e => {
    if (e.key === "Enter") {
      this.setState(initialState);
      this.addUser();
    }
  };

  handleEdit = (id, editName) => {
    this.setState({ onEdit: id, editName });
  };

  render() {
    const { token, board } = this.props;
    return (
      <WrapTags>
        <Title>Các thành viên</Title>
        {board.users.map((user, index) => (
          <Tag key={index}>{user}</Tag>
        ))}
        <Button
          onClick={this.handleInput}
          inputVisible={this.state.inputVisible}
          onBlur={this.handleBlur}
        >
          <Icon type="plus" theme="outlined" />
          <input
            onChange={this.handleChange}
            name="addUser"
            type="text"
            ref={c => (this.input = c)}
            onKeyPress={this.handKeyPress}
            value={this.state.addUser}
          />
        </Button>
      </WrapTags>
    );
  }
}

export default connect(
  state => ({
    board: state.BoardSelected,
    token: state.Auth.token
  }),
  { actUpdateBoard }
)(ListUsers);
