import styled from "styled-components";

export const Dimmed = styled.div<{ isOpen: boolean; opacity: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ opacity }) => `rgba(0, 0, 0, ${opacity})`};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};

  transition: z-index 0.5s, opacity 0.5s;
  ${({ isOpen }) => !isOpen && "visibility: hidden;"};
`;
