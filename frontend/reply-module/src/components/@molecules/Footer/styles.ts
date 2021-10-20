import { PALETTE } from "@/constants/styles/palette";
import styled from "styled-components";

export const Container = styled.footer`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  margin-top: 1rem;
  border-top: 1px solid ${({ theme: { isDarkModePage } }) => (isDarkModePage ? PALETTE.WHITE : PALETTE.GRAY_400)};
`;

export const CopyRight = styled.span`
  color: ${({ theme: { isDarkModePage } }) => (isDarkModePage ? PALETTE.WHITE : PALETTE.GRAY_600)};
  font-weight: 700;
`;

export const LogoButton = styled.a`
  background-color: transparent;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const Logo = styled.img`
  margin-top: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.2rem;
  margin-right: 0.3rem;
`;

export const ServiceName = styled.span`
  font-size: 1.5rem;
  line-height: 2.25rem;
  font-weight: 700;
  color: ${({ theme: { isDarkModePage } }) => (isDarkModePage ? PALETTE.WHITE : PALETTE.GRAY_600)};
`;
