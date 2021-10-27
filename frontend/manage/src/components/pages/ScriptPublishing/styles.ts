import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "@/constants/styles/constants";
import { PALETTE } from "@/constants/styles/palette";
import { contentBoxCSS, orderedListCSS, titleCSS } from "@/constants/styles/css";

export const Container = styled.div`
  ${contentBoxCSS}
`;

export const Title = styled.h2`
  ${titleCSS};
`;

export const CodeBlockWrapper = styled.div`
  border-radius: 10px;
  padding: 0;
  position: relative;
  box-sizing: border-box;
  margin-top: 1rem;
`;

export const CopyButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 1rem;

  min-width: fit-content;
  width: fit-content;
  height: 3.6rem;
  background-color: ${PALETTE.SECONDARY};
  color: ${PALETTE.WHITE};
  font-size: 1.6rem;
  line-height: ${1.6 * LINE_HEIGHT_SCALE}rem;
  font-weight: 500;
  border-radius: 10px;
  padding: 0.7rem 1.6rem;
  transform: scale(0.8);
`;

export const BlogLogoWrapper = styled.div`
  margin-top: 3em;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 780px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 320px) {
    grid-template-columns: repeat(1, 1fr);
  }
  row-gap: 2rem;
`;

export const Ol = styled.ol`
  ${orderedListCSS};
`;

export const ScriptContainer = styled.div<{
  isDarkModePage: boolean;
}>`
  width: 100%;
  background-color: ${({ isDarkModePage }) => (isDarkModePage ? "black" : "white")};
  border: 1px solid ${PALETTE.GRAY_400};
  border-radius: 10px;
  padding: 1rem 2rem;
`;

export const GuidePDF = styled.iframe<{ isGuidePdfVisible: boolean }>`
  opacity: ${({ isGuidePdfVisible }) => (isGuidePdfVisible ? 1 : 0)};
  transition: all 0.2s;
`;

export const PreviewForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${PALETTE.GRAY_600};
  padding: 1rem 2rem;
  border-radius: 10px;

  & > button:last-of-type {
    margin-left: auto;
  }
`;

export const FormRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const FormLabel = styled.span`
  font-size: 1.2rem;
  margin-right: 1.5rem;
  font-weight: 700;
  line-height: ${1.3 * LINE_HEIGHT_SCALE}rem;
`;
