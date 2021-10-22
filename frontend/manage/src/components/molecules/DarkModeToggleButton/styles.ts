import { PALETTE } from "@/constants/styles/palette";
import styled from "styled-components";

export const Container = styled.div<{ isDarkModePage: boolean }>`
  position: relative;
  background: ${({ isDarkModePage }) => (isDarkModePage ? PALETTE.BLACK_700 : "transparent")};
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.5s;
  border: 2px solid ${({ isDarkModePage }) => (isDarkModePage ? PALETTE.BLACK_700 : PALETTE.GRAY_300)};
  padding: 8px;

  border-radius: 20px;
`;

export const Img = styled.img`
  object-fit: cover;

  &:first-child {
    margin-right: 16px;
  }
`;

export const Ball = styled.div<{ isDarkModePage: boolean }>`
  position: absolute;
  width: 23px;
  height: 23px;
  background-color: ${({ isDarkModePage }) => (isDarkModePage ? PALETTE.GRAY_500 : PALETTE.GRAY_400)};
  border-radius: 50%;
  transform: ${({ isDarkModePage }) => (isDarkModePage ? "translateX(100%)" : "translateX(0%)")};
  transition: all 0.5s;
`;
