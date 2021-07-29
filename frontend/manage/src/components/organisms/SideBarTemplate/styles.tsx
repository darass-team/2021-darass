import styled from "styled-components";
import { contentBoxCSS } from "../../../styles/css";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  transition: all 0.3s ease-in;
  > * {
    transition: all 0.3s ease-in;
  }
  @media (max-width: 780px) {
    flex-direction: column;
    > * {
      width: 100%;
      & + & {
        margin-top: 2rem;
      }
    }
  }
`;

export const MainContent = styled.main`
  width: 100%;
  transition: all 0.3s ease-in;
  margin-left: 2rem;
  ${contentBoxCSS}

  @media (max-width: 780px) {
    margin-left: 0;
    margin-top: 2rem;
  }
`;
