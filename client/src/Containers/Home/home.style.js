import styled from "styled-components";

export const ContainerWrapper = styled.div`
  margin: 3rem 10rem;
  display: flex;
`;

export const SideBarWrapper = styled.div`
  width: 200px;
  height: auto;
  margin-right: 3rem;
  .teams {
    margin-top: 1rem;
    color: #89969d;
    font-weight: 14px;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: auto;
  background: lightgray;
  div {
    display: flex;
    flex-flow: row wrap;
  }
  h3 {
    margin: 10px;
  }
`;

export const Button = styled.div`
  width: 100%;
  border-radius: 4px;
  background: ${props => (props.active ? "#e4f0f6" : "#fff")};
  font-weight: ${props => (props.fw ? 600 : 500)};
  font-size: ${props => (props.fw ? "15px" : "14px")};
  margin-bottom: 5px;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background: ${props => (props.active ? "#e4f0f6" : "lightgrey")};
  }
`;

export const BoardCard = styled.div`
  width: 10rem;
  height: 5rem;
  background: #40a35b;
  color: #fff;
  font-weight: bold;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #2c8243;
  }
`;
