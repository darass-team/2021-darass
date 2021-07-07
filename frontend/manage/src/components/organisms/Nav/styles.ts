import { Link } from "react-router-dom";
import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

const Container = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: transparent;
`;

const NavLink = styled(Link)`
  margin-left: 0.8rem;
  font-size: 2.4rem;
  font-weight: 800;
  color: ${PALETTE.WHITE};
`;

export { Container, NavLink };