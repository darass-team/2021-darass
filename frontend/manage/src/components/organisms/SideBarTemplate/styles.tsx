import styled from "styled-components";
import { contentBoxCSS } from "../../../styles/css";
import SiderComponent from "../SideBar";

export const Container = styled.div`
  position: relative;
  width: 100%;

  > * {
    transition: all 0.3s ease-in;
  }
`;

export const SideBar = styled(SiderComponent)`
  position: fixed;
  top: 8.4rem;

  width: 15rem;
  @media (max-width: 1080px) {
    width: 100%;
    position: static;
  }
`;

export const MainContent = styled.main`
  ${contentBoxCSS}
  position: absolute;
  left: 18rem;
  top: 0;
  width: 48rem;

  @media (max-width: 1080px) {
    left: 0;
    top: 100%;
    margin-top: 2rem;
    width: 100%;
  }
`;
