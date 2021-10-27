import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "@/constants/styles/constants";
import UserOptionComponent from "@/components/atoms/UserOption";

export const Container = styled.div<{ isUserInfoReady?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;

  opacity: ${({ isUserInfoReady }) => (isUserInfoReady ? 0 : 1)};

  & > img {
    cursor: pointer;
  }
`;

export const UserNickName = styled.button`
  margin-left: 0.5rem;
  font-size: 1.25rem;
  line-height: ${1.25 * LINE_HEIGHT_SCALE}rem;
  font-weight: 700;
`;

export const UserOption = styled(UserOptionComponent)`
  right: 0;
  top: 2rem;
`;

export const DownArrow = styled.img<{ isShowOptionBox: boolean; isImageLoaded: boolean }>`
  transform: ${props => props.isShowOptionBox && "rotate(180deg);"};
  opacity: ${({ isImageLoaded }) => (isImageLoaded ? 1 : 0)};
`;
