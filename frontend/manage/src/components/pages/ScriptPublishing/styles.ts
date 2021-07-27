import { orderedListCSS, paragraphCSS, subTitleCSS, titleCSS } from "./../../../styles/css";
import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Section = styled.section`
  margin-bottom: 6rem;
`;

export const Title = styled.h2`
  ${titleCSS};
`;

export const CodeBlockWrapper = styled.div`
  border-radius: 10px;
  padding: 0;
  position: relative;
  box-sizing: border-box;
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
  font-weight: 500;
  border-radius: 10px;
  padding: 0.7rem 1.6rem;
  transform: scale(0.8);
`;

export const BlogLogoWrapper = styled.div`
  margin-top: 3em;
  display: flex;
  & > * {
    margin: 0 2rem;
  }
`;

export const SubTitle = styled.h3`
  ${subTitleCSS};
`;

export const P = styled.p`
  ${paragraphCSS};
`;

export const Ol = styled.ol`
  ${orderedListCSS};
`;
