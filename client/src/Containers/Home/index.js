import React, { Component } from "react";
import {
  ContainerWrapper,
  SideBarWrapper,
  ContentWrapper,
  Button
} from "./home.style";
import Content from "./Content";
import { actGetAllBoards } from "../../redux/actions/boards";
import { connect } from "react-redux";

class Home extends Component {
  componentDidMount() {
    this.props.token && this.props.actGetAllBoards(this.props.token);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.props.actGetAllBoards(nextProps.token);
    }
  }

  render() {
    return (
      <ContainerWrapper>
        <SideBarWrapper>
          <div>
            <Button fw active>
              Bảng
            </Button>
            <Button fw>Trang chủ</Button>
          </div>
          <div className="teams">
            <div>Nhóm</div>
            <Button>Tạo nhóm mới</Button>
          </div>
        </SideBarWrapper>
        <ContentWrapper>
          {this.props.token ? <Content /> : "You need login!!!"}
        </ContentWrapper>
      </ContainerWrapper>
    );
  }
}

export default connect(
  state => ({
    token: state.Auth.token
  }),
  { actGetAllBoards }
)(Home);
