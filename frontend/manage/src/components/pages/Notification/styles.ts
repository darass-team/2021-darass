import { contentBoxCSS, titleCSS } from "@/constants/styles/css";
import styled from "styled-components";

export const Container = styled.div`
  ${contentBoxCSS}
  height: fit-content;
  min-height: 50rem;
  max-height: 100rem;
  overflow-y: hidden;
  font-size: 1.3rem;
`;

export const Title = styled.h2`
  ${titleCSS};
`;

export const AlarmContainer = styled.div`
  padding: 0rem;
  overflow-y: scroll;
`;
