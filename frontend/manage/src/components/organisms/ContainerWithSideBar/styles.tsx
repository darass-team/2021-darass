import styled from "styled-components";
import { PAGE_MAX_WIDTH } from "@/constants/styles/constants";
import SideBarComponent from "../SideBar";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: ${PAGE_MAX_WIDTH}) {
    width: 100%;
    top: 0;
    flex-direction: column;
  }
`;

export const SideBar = styled(SideBarComponent)<{ offsetY: number }>`
  height: max-content;
  position: relative;
  top: ${props => props.offsetY}px;
  transition: width 0.3s, top 1.5s ease-out;

  min-width: 15rem;

  @media (max-width: ${PAGE_MAX_WIDTH}) {
    width: 100%;
    top: 0;
  }
`;

export const MainContent = styled.main`
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
