import styled from "styled-components";
import UserOptionComponent from "../../atoms/UserOption";

const Container = styled.div`
  position: relative;
  width: fit-content;

  & > img {
    cursor: pointer;
  }
`;

const UserOption = styled(UserOptionComponent)`
  position: absolute;
  right: 7px;
  top: 50px;
`;

export { Container, UserOption };
