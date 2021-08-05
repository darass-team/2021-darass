import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "../../../styles/constants";
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
  line-height: ${1.25 * LINE_HEIGHT_SCALE}rem;
  font-weight: 800;
`;

export const UserOption = styled(UserOptionComponent)`
  position: absolute;
  right: 7px;
  top: 50px;
`;

export const DownArrow = styled.img<{ isShowOptionBox: boolean }>`
  transform: ${props => props.isShowOptionBox && "rotate(180deg);"};
`;
