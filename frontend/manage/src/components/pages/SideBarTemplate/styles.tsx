import styled from "styled-components";
import { contentBoxCSS } from "../../../styles/css";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MainContent = styled.main`
  width: 50rem;
  ${contentBoxCSS}
`;
