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
        input {
          background: none;
          border: none;
        }
      }
    }
  }
`;

export const Logo = styled.div``;
