import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";
import Avatar from "../../atoms/Avatar";
import { LINE_HEIGHT_SCALE, Z_INDEX } from "../../../styles/constants";

export const Container = styled.nav`
  @media (min-width: 780px) {
    display: none;
  }
`;

export const MenuWrapper = styled.nav<{ isOpen: boolean }>`
  width: 70%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: ${Z_INDEX.NAV.MOBILE.MENU_WRAPPER};
  position: fixed;

  background: ${PALETTE.PRIMARY};
  height: 100%;
  text-align: left;
  padding: 10rem 2rem;
  top: 0;
  left: 0;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.4s ease-in-out;
`;

export const Name = styled.p`
  width: 100%;
  font-size: 2rem;
  line-height: ${2 * LINE_HEIGHT_SCALE}rem;
  padding: 2rem;
  text-align: center;
  font-weight: 700;
`;

export const AuthLink = styled(Link)`
  position: absolute;
  top: 5%;
  right: 2rem;
  font-size: 1.5rem;
  line-height: ${1.5 * LINE_HEIGHT_SCALE}rem;
  text-align: center;
  font-weight: 700;
`;

export const MenuAvatar = styled(Avatar)`
  margin: 0 auto;
  transform: scale(1rem);
  margin-bottom: 2rem;
`;

export const Menu = styled(NavLink)`
  font-size: 2rem;
  line-height: ${2 * LINE_HEIGHT_SCALE}rem;
  text-transform: uppercase;
  padding: 2rem;
  border-radius: 10px;
  font-weight: 700;
  letter-spacing: 0.5rem;
  color: ${PALETTE.WHITE};
  text-decoration: none;
  transition: all 0.1s;
  width: 100%;

  &:hover {
    background-color: ${PALETTE.SECONDARY};
  }

  & + & {
    margin-top: 1rem;
  }
`;
