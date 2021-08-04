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
  font-size: 1.6rem;
  line-height: 2.4rem;
  font-weight: 700;
  margin-right: 10px;
  padding: 0;
  background-color: transparent;
`;

export const UserOption = styled(UserOptionComponent)`
  position: absolute;
  right: 7px;
  top: 50px;
`;
