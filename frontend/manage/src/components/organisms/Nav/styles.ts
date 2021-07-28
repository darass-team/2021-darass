import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { NAVIGATION_HEIGHT, PAGE_MAX_WIDTH } from "../../../styles/constants";
import { PALETTE } from "../../../styles/palette";

export const Container = styled.nav`
  position: relative;
  width: 100%;
  height: ${NAVIGATION_HEIGHT};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${PALETTE.WHITE};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  z-index: 99;
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
  font-weight: 800;
  transition: border 0.1s;

  &:hover {
    border-bottom: 5px solid ${PALETTE.PRIMARY};
  }
`;

export const Title = styled.span`
  margin-left: 10px;
  font-size: 1.25rem;
  font-weight: 800;
  color: ${PALETTE.BLACK_700};
`;

export const UserAvatarOptionWrapper = styled.div`
  margin-left: auto;
`;

export const LoginLink = styled(Link)`
  margin-left: 1.5rem;
  font-size: 1.25rem;
  font-weight: 800;
`;
