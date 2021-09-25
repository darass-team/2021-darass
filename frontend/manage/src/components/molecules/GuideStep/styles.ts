import styled from "styled-components";
import { paragraphCSS, subTitleCSS } from "@/constants/styles/css";

export const Section = styled.section`
  margin-bottom: 6rem;
`;

export const SubTitle = styled.h3`
  ${subTitleCSS};
`;

export const P = styled.p`
  ${paragraphCSS};
`;
