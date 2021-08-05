import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 15rem;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-row-gap: 0.5rem;
`;
