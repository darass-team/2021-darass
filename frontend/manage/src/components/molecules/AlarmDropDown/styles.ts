import { contentBoxCSS } from "@/constants/styles/css";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  padding-top: 0.2rem;
`;

export const DropDownContainer = styled.div`
  height: fit-content;
  max-height: 30rem;
  min-height: 30rem;
  right: -3rem;
  top: 0.5rem;
  width: 30rem;
  overflow-y: scroll;
  ${contentBoxCSS}
  padding: 0rem;
`;
