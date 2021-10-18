import { PALETTE } from "@/constants/styles/palette";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  background: ${({ theme: { isDarkModePage } }) => (isDarkModePage ? "transparent" : PALETTE.BLACK_700)};
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.5s;
  border: 2px solid ${({ theme: { isDarkModePage } }) => (isDarkModePage ? PALETTE.GRAY_300 : PALETTE.BLACK_700)};
  padding: 0.5rem;

  border-radius: 20px;
`;

export const Img = styled.img`
  object-fit: cover;

  &:first-child {
    margin-right: 1rem;
  }
`;

export const Ball = styled.div<{ right: boolean }>`
  position: absolute;
  width: 22px;
  height: 22px;
  background-color: ${({ theme: { isDarkModePage } }) => (isDarkModePage ? PALETTE.GRAY_400 : PALETTE.GRAY_300)};
  border-radius: 50%;
  transform: ${({ right }) => (right ? "translateX(100%)" : "translateX(0%)")};
  transition: all 0.5s;
`;
