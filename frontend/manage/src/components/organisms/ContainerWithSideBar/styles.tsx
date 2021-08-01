import styled from "styled-components";
import { PAGE_MAX_WIDTH, Z_INDEX } from "../../../styles/constants";
import { contentBoxCSS } from "../../../styles/css";
import SiderComponent from "../SideBar";

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: ${PAGE_MAX_WIDTH}) {
    width: 100%;
    top: 0;
    flex-direction: column;
  }
`;

export const SideBar = styled(SiderComponent)<{ offsetY: number }>`
  position: relative;
  z-index: ${Z_INDEX.CONTAINER_WITH_SIDEBAR.SIDEBAR.SELF};
  height: max-content;
  top: ${props => props.offsetY}px;
  transition: width 0.3s, top 1.5s ease-out;

  min-width: 15rem;

  @media (max-width: ${PAGE_MAX_WIDTH}) {
    width: 100%;
    top: 0;
  }
`;

export const MainContent = styled.main`
  z-index: ${Z_INDEX.CONTAINER_WITH_SIDEBAR.MAIN_CONTENT.SELF};
  ${contentBoxCSS}

  margin-left: 2rem;
  left: 18rem;
  width: 48rem;

  transition: all 0.3s ease-in;

  @media (max-width: ${PAGE_MAX_WIDTH}) {
    left: 0;
    margin-top: 2rem;
    margin-left: 0;
    width: 100%;
  }
`;
