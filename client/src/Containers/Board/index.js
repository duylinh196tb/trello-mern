import React from "react";
import "@atlaskit/css-reset";
import Board from "./Board";
import styled from "styled-components";
import { connect } from "react-redux";
import { actGetBoard } from "../../redux/actions/boards";
const BoardWrapper = styled.div`
  margin: 50px;
`;

class BoardIndex extends React.Component {
  componentDidMount() {
    this.props.actGetBoard(this.props.match.params.boards_id);
  }

  render() {
    return (
      <BoardWrapper>
        <Board board={this.props.board} />
      </BoardWrapper>
    );
  }
}

export default connect(
  state => ({
    board: state.BoardSelected
  }),
  { actGetBoard }
)(BoardIndex);