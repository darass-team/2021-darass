import { LINE_HEIGHT_SCALE, NAVIGATION_HEIGHT, PAGE_MAX_WIDTH } from "@/constants/styles/constants";
import { PALETTE } from "@/constants/styles/palette";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.nav`
  position: relative;
  width: 100%;
  height: ${NAVIGATION_HEIGHT};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${PALETTE.WHITE};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  @media (max-width: 780px) {
    display: none;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${PAGE_MAX_WIDTH};
  display: flex;
  align-items: center;
  padding: 0 0.95rem;
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;

export const Menu = styled.div`
  height: 100%;
  display: flex;
  margin-left: 4rem;
`;

export const MenuLink = styled(NavLink)`
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
  font-size: 1.25rem;
  line-height: ${1.25 * LINE_HEIGHT_SCALE}rem;
  font-weight: 600;
  transition: border 0.1s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-bottom: 5px solid ${PALETTE.PRIMARY};
    }
  }
`;

export const Title = styled.span`
  margin-left: 10px;
  font-size: 1.25rem;
  line-height: ${1.25 * LINE_HEIGHT_SCALE}rem;
  font-weight: 700;
  color: ${PALETTE.BLACK_700};
`;

export const UserAvatarOptionWrapper = styled.div`
  margin-left: 1.5rem;
`;

export const LoginMethodWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

export const LoginMethod = styled.button.attrs({ type: "button" })`
  margin-left: 0.5rem;
  font-weight: 700;
  background-color: transparent;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
