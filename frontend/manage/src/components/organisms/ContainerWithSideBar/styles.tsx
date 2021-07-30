import styled from "styled-components";
import { PAGE_MAX_WIDTH } from "../../../styles/constants";
import { contentBoxCSS, crossBrowsingPrefix } from "../../../styles/css";
import SiderComponent from "../SideBar";

export const Container = styled.div`
  position: relative;
  width: 100%;
  :after {
    content: "";
    display: block;
    clear: both;
  }
`;

export const SideBar = styled(SiderComponent)<{ offsetY: number }>`
  position: absolute;
  z-index: 1;

  top: ${props => props.offsetY}px;
  ${crossBrowsingPrefix("transition", "width 0.3s, top 1.5s ease-out")}

  width: 15rem;

  @media (max-width: ${PAGE_MAX_WIDTH}) {
    width: 100%;
    top: 0;
  }
`;

export const MainContent = styled.main`
  z-index: 0;
  ${contentBoxCSS}
  position: relative;
  left: 18rem;
  top: 0;
  width: 48rem;

  ${crossBrowsingPrefix("transition", "all 0.3s ease-in")}

  @media (max-width:${PAGE_MAX_WIDTH}) {
    left: 0;
    top: 14rem;
    margin-top: 2rem;
    width: 100%;
  }
`;
