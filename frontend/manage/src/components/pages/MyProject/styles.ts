import { PALETTE } from "@/constants/styles/palette";
import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "@/constants/styles/constants";
import { titleCSS } from "@/constants/styles/css";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30rem;
`;

export const HeaderWrapper = styled.div`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Title = styled.h2`
  ${titleCSS};
  margin-right: auto;
`;

export const AddProjectButton = styled.button`
  background-color: ${PALETTE.SECONDARY};
  color: ${PALETTE.WHITE};
  border-radius: 10px;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: ${1.4 * LINE_HEIGHT_SCALE}rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0.8rem;
  align-self: flex-end;
  transition: background-color 0.3s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${PALETTE.SECONDARY_HOVER};
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > button {
    margin-bottom: 2rem;
  }
`;

export const Message = styled.span`
  margin-top: 2rem;
  font-size: 1.3rem;
  line-height: ${1.3 * LINE_HEIGHT_SCALE}rem;
  font-weight: 700;
  text-align: center;
`;
