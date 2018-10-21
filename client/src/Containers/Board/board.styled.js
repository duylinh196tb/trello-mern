import styled from "styled-components";

export const WrapTags = styled.div`
  display: flex;
  height: auto;
  flex-flow: row wrap;
  width: 100%;
  margin-top: 20px;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

export const Tag = styled.div`
  min-width: 120px;

  height: 40px;
  background: #87d068;
  color: white;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 25px;
  margin: 5px;
  font-weight: bold;
  transition: 0.1s;
  cursor: pointer;
  div {
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  i {
    opacity: 0;
    width: 10%;
    display: flex;
    align-items: center;
    height: 100%;
    color: white;
    opacity: ${props => (props.onSelected ? 1 : 0)};
    display: ${props => (props.onSelected ? "" : "none")};
  }

  input {
    border: none;
    width: 100%;
    font-weight: bold;
    outline: none;
    background: none;
    padding-left: 20px;
  }
`;
export const Button = styled.div`
  background: lightgrey;
  margin: 5px;
  font-weight: bold;
  display: flex;
  padding: 0 5px;
  align-items: center;
  justify-content: center;
  width: ${props => (props.inputVisible ? "150px" : "40px")};
  height: 40px;
  transition: 0.2s;
  border-radius: 25px;
  i {
    opacity: ${props => (props.inputVisible ? 0 : 1)};
  }

  cursor: pointer;
  input {
    border: none;
    width: ${props => (props.inputVisible ? "100%" : "0px")};
    color: "grey";
    font-weight: bold;
    outline: none;
    background: none;
  }
`;
