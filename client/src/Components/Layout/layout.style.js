import styled from "styled-components";

export const HeaderWrapper = styled.header`
  width: 100vw;
  height: 50px;
  background: #0080ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    margin: 0 10px;
    ul {
      list-style-type: none;

      li {
        float: left;
        color: #fff;
        background: #67a6ca;
        font-weight: 600;
        border-radius: 4px;
        margin-left: 5px;
        padding: 5px;
        cursor: pointer;
        input {
          background: none;
          border: none;
        }
      }
    }
  }
`;

export const Logo = styled.div``;

export const InputWrapper = styled.div`
  width: 250px;
  height: 50px;
  border-radius: 25px;
  padding-left: 20px;
  border: none;
  outline: none;
  background: #e6e6e6;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  i {
    font-size: 20px;
    margin: 0 5px;
  }

  input {
    outline: none;
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
  }
`;

export const ButtonLogin = styled.button`
  background-image: linear-gradient(to right, #79bb58, #4bb04f);
  width: 250px;
  height: 50px;
  border-radius: 25px;
  padding-left: 20px;
  border: none;
  outline: none;
  cursor: pointer;
  margin-top: 10px;
  font-weight: bold;
  font-size: 16px;
  &:hover {
    transition: 0.3s;
    background-image: linear-gradient(to right, lightgrey, grey);
  }
`;

export const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  div {
    padding: 10px;
    cursor: pointer;
  }
  strong {
    font-size: 20px;
  }
`;
