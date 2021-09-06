import CSS from "csstype";
import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "@/styles/constants";
import { PALETTE } from "@/styles/palette";
import ScreenContainer from "@/styles/ScreenContainer";

export const SectionContainer = styled(ScreenContainer)<{ minHeightVh: number }>`
  min-height: ${props => props.minHeightVh}vh;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainText = styled.h2`
  font-size: 3rem;
  line-height: ${3 * LINE_HEIGHT_SCALE}rem;
  color: ${PALETTE.WHITE};
  font-weight: 700;
  text-align: center;
`;

export const Button = styled.button`
  min-width: 18rem;
  height: 6rem;
  background: ${PALETTE.TERTIARY};
  border: none;
  border-radius: 4rem;
  font-weight: 700;
  font-size: 2.5rem;
  line-height: ${2.5 * LINE_HEIGHT_SCALE}rem;
  color: ${PALETTE.BLACK_700};
  margin-top: 8.8rem;
`;

export const ScrollDownTrigger = styled.a`
  position: relative;
  bottom: -7rem;

  & > img {
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
  }
`;

export const Text = styled.p<{ color: PALETTE; fontSize: number; textAlign?: CSS.Property.TextAlign }>`
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
  width: 80rem;
`;

export const TextContentContainer = styled.div`
  margin-top: 5rem;
  & > p {
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
