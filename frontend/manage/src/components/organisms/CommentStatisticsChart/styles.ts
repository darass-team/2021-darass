import styled from "styled-components";

export const Container = styled.div<{ isDataLoaded: boolean }>`
  width: 100%;
  height: 50vh;
  transition: all 0.3s;
  opacity: ${({ isDataLoaded }) => (isDataLoaded ? 1 : 0)};
`;
