import styled from "styled-components";
import UserOptionComponent from "../../atoms/UserOption";

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;

  & > img {
    cursor: pointer;
  }
`;

export const UserNickName = styled.button`
  margin-left: 0.5rem;
  font-size: 1.25rem;
  font-weight: 800;
`;

export const UserOption = styled(UserOptionComponent)`
  position: absolute;
  right: 7px;
  top: 50px;
`;
