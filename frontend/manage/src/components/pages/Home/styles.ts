import CSS from "csstype";
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
  height: 100%;
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

export const Button = styled.button`
  min-width: 15rem;
  padding: 0.5rem 2rem;
  @media all and (max-width: 780px) {
    padding: 1rem 2rem;
  }

  background-color: ${PALETTE.PRIMARY};
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 2rem;
  line-height: ${2.5 * LINE_HEIGHT_SCALE}rem;
  color: ${PALETTE.WHITE};
  margin-top: 8.8rem;
`;

export const ScrollDownTrigger = styled.a`
  position: absolute;
  bottom: 0;

  @keyframes upDown {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-0.75rem);
    }
    100% {
      transform: translateY(0);
    }
  }

  animation: upDown 2s 0s linear infinite;
`;

export const ScrollToTopButton = styled.button`
  position: fix;
  right: 0;
  bottom: 0;
`;

export const Text = styled.span<{ color: PALETTE; fontSize: number; textAlign?: CSS.Property.TextAlign }>`
  font-size: ${props => props.fontSize}rem;
  line-height: ${props => props.fontSize * LINE_HEIGHT_SCALE}rem;
  color: ${props => props.color};
  font-weight: 700;
  text-align: ${props => props.textAlign || "center"};
  word-break: break-all;
`;

export const HighlightText = styled.span<{ color: PALETTE }>`
  color: ${props => props.color};
`;

export const Letter = styled.div`
  display: inline-block;
`;

export const PhoneImage = styled.img`
  width: 25rem;
`;

export const TextContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  & > span {
    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }
`;

export const Companies = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export const CompanyLogo = styled.img`
  width: 20rem;
`;
