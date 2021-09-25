import Avatar from "@/components/atoms/Avatar";
import { LINE_HEIGHT_SCALE } from "@/constants/styles/constants";
import { PALETTE } from "@/constants/styles/palette";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.nav`
  @media (min-width: 780px) {
    display: none;
  }
`;

export const MenuWrapper = styled.nav`
  width: 70%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: ${PALETTE.PRIMARY};
  text-align: left;
  padding: 10rem 2rem;
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

export const MenuHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const AuthLink = styled(Link)`
  font-size: 1.5rem;
  line-height: ${1.5 * LINE_HEIGHT_SCALE}rem;
  text-align: center;
  font-weight: 700;
  margin-left: 1rem;
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

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${PALETTE.SECONDARY};
    }
  }

  & + & {
    margin-top: 1rem;
  }
`;
