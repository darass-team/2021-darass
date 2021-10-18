import styled from "styled-components";
import { PALETTE } from "@/constants/styles/palette";
import UserOptionComponent from "@/components/@atoms/UserOption";

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
  font-size: 1.4rem;
  line-height: 2.1rem;
  font-weight: 700;
  margin-right: 10px;
  color: ${({ theme: { isDarkModePage } }) => (isDarkModePage ? PALETTE.WHITE : PALETTE.GRAY_800)};
  padding: 0;
  background-color: transparent;
`;

export const UserOption = styled(UserOptionComponent)`
  position: absolute;
  right: 0.4rem;
  top: 3.5rem;
`;
