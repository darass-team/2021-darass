import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "@/constants/styles/constants";
import { PALETTE } from "@/constants/styles/palette";
import ScreenContainer from "@/components/@style/ScreenContainer";

export const SectionContainer = styled(ScreenContainer)<{ subtractMinHeight?: string }>`
  ${props => props.subtractMinHeight && `min-height: calc(100vh - ${props.subtractMinHeight});`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainText = styled.h2`
  font-size: 2.5rem;
  line-height: ${3 * LINE_HEIGHT_SCALE}rem;
  color: ${PALETTE.WHITE};
  font-weight: 700;
  word-break: break-all;
  text-align: center;
`;

export const HighlightText = styled.span<{ color: PALETTE }>`
  color: ${props => props.color};
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 2rem;
  line-height: ${2 * LINE_HEIGHT_SCALE}rem;
  padding: 1rem 3rem;
  margin-bottom: 2rem;

  &:first-of-type {
    margin-top: 8.8rem;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: scale(1.1);
    }
  }

  & > img {
    margin-right: 0.5rem;
    width: 1.25rem;
    height: 1.25rem;
    object-fit: fill;
    margin-top: 0.15rem;
  }

  & > span {
    line-height: ${1.5 * LINE_HEIGHT_SCALE}rem;
    font-size: 1.5rem;
  }
`;

export const KakaoLoginButton = styled(Button)`
  background: ${PALETTE.TERTIARY};
  color: ${PALETTE.BLACK_700};
`;

export const NaverLoginButton = styled(Button)`
  background: ${PALETTE.WHITE};
  color: ${PALETTE.BLACK_700};
`;

export const GithubLoginButton = styled(Button)`
  background: #fff;
  color: #171515;
`;
