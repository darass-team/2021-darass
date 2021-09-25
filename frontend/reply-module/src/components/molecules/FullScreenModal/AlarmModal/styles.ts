import { contentBoxCSS } from "@/constants/styles/css";
import styled from "styled-components";

export const Container = styled.div`
  padding-top: 0.2rem;
`;

export const AlarmContainer = styled.div`
  ${contentBoxCSS}
  height: fit-content;
  max-height: 30rem;
  min-height: 30rem;
  width: 30rem;
  overflow-y: scroll;
  padding: 0rem;
`;
