import React, { Component } from "react";
import { BoardCard } from "./home.style";
import { Link } from "react-router-dom";
import data from "./fakeData";
import { connect } from "react-redux";

class Content extends Component {
  renderBoardCards(data) {
    return data.map(board => (
      <Link to={`/boards/${board._id}`}>
        <BoardCard>{board.title}</BoardCard>
      </Link>
    ));
  }

  render() {
    // console.log(this.props.boards.Boards);
    return (
      <React.Fragment>
        <h3>Bảng cá nhân</h3>
        <div>
          {this.props.boards && this.renderBoardCards(this.props.boards)}
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    boards: state.Boards
  }),
  {}
)(Content);
