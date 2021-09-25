import { contentBoxCSS, fadeInDirectionCSS } from "@/constants/styles/css";
import styled from "styled-components";

export const Container = styled.div`
  padding-top: 0.2rem;
  transition: all 0.4s ease-in-out;

  @media all and (max-width: 780px) {
    ${fadeInDirectionCSS["bottom"](true)}
  }
  @media all and (min-width: 780px) {
    ${fadeInDirectionCSS["right"](true)}
  }
`;

export const AlarmContainer = styled.div`
  ${contentBoxCSS}

  width: 30rem;
  overflow-y: scroll;
  padding: 0rem;

  @media all and (max-width: 780px) {
    width: 100vw;
    height: 30rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  @media all and (min-width: 780px) {
    height: 100vh;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;
