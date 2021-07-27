import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MainContent = styled.main`
  width: 50rem;
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem;
  background-color: ${PALETTE.WHITE};
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
`;
