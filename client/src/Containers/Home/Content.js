import React, { Component } from "react";
import { BoardCard } from "./home.style";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Content extends Component {
  renderBoardCards(data) {
    let result = null;
    if (data.length > 0)
      result = data.map(board => (
        <Link to={`/boards/${board._id}`}>
          <BoardCard>{board.title}</BoardCard>
        </Link>
      ));

    return result;
  }

  render() {
    // console.log(this.props.boards.Boards);
    return (
      <React.Fragment>
        <h3>Bảng của {this.props.email || "bạn"}</h3>
        <div>
          {this.props.boards && this.renderBoardCards(this.props.boards)}
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    boards: state.Boards,
    token: state.Auth.token,
    email: state.Auth.email
  }),
  {}
)(Content);
