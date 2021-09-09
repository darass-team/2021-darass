import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "../../../styles/constants";
import { PALETTE } from "../../../styles/palette";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Introduction = styled.h2`
  font-size: 3rem;
  line-height: ${3 * LINE_HEIGHT_SCALE}rem;
  color: ${PALETTE.WHITE};
  font-weight: 700;
  text-align: center;
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

  & > img {
    margin-right: 0.5rem;
    width: 1.25rem;
    height: 1.25rem;
    object-fit: fill;
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

export const GithubLoginButton = styled(Button)`
  background: #fff;
  color: #171515;
`;
