import styled from "styled-components";
import { contentBoxCSS } from "../../../styles/css";
import ProjectSideBar from "../ProjectSideBar";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  transition: all 0.3s ease-in;
  position: relative;
  width: 100%;

  @media (max-width: 1080px) {
    flex-direction: column;
  }

  > * {
    transition: all 0.3s ease-in;
  }
`;

export const SideBar = styled(ProjectSideBar)`
  width: 15rem;
  @media (max-width: 1080px) {
    width: 100%;
  }
`;

export const MainContent = styled.main`
  ${contentBoxCSS}
  position: absolute;
  left: 18rem;
  top: 0;
  width: 50rem;

  @media (max-width: 1080px) {
    left: 0;
    top: 100%;
    margin-top: 2rem;
    width: 100%;
  }
`;
