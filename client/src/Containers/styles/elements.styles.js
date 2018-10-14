import styled from "styled-components";

export const Button = styled.button`
  /* Adapt the colours based on primary prop */
  background: ${props => (props.primary ? "lightgrey" : "white")};
  /* color: ${props => (props.primary ? "white" : "lightgrey")}; */

  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 0.5em;
  border: 1px solid lightgrey;
  border-radius: 3px;
  cursor: pointer;
`;
