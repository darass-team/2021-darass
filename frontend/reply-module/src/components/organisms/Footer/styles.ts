import { PALETTE } from "./../../../styles/palette";
import styled from "styled-components";

export const Container = styled.footer`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  padding: 1rem 0;
  border-top: 2px solid ${PALETTE.GRAY_400};
`;

export const CopyRight = styled.span`
  color: ${PALETTE.GRAY_600};
  font-weight: 700;
`;

export const LogoButton = styled.a`
  background-color: transparent;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const Logo = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.2rem;
  margin-right: 0.3rem;
`;

export const ServiceName = styled.span`
  font-size: 1.5rem;
  line-height: 2.25rem;
  font-weight: 700;
`;
