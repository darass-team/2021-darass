import { FadeInDirection } from "@/components/atoms/Modal";
import { css, FlattenSimpleInterpolation } from "styled-components";
import { LINE_HEIGHT_SCALE } from "./constants";
import { PALETTE } from "./palette";

export const speechBubbleCSS = css`
  position: absolute;
  width: 6rem;
  box-shadow: 1.04082px 1.04082px 6.24491px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${PALETTE.WHITE};

  ::before {
    content: "";
    position: absolute;
    top: -5px;
    right: 8px;

    border-bottom: 10px solid ${PALETTE.WHITE};
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }

  & > button {
    width: 100%;
    background-color: ${PALETTE.WHITE};
    font-weight: 600;
    margin-bottom: 0.3rem;
    border-radius: 10px;

    :first-child {
      padding-top: 0.5rem;
    }

    :last-child {
      margin-bottom: 0;
      padding-bottom: 0.5rem;
    }
  }
`;

export const titleCSS = css`
  font-size: 2rem;
  line-height: ${2 * LINE_HEIGHT_SCALE}rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

export const subTitleCSS = css`
  font-size: 1.6rem;
  line-height: ${1.6 * LINE_HEIGHT_SCALE}rem;
  word-break: keep-all;
  margin-bottom: 1rem;
`;

export const paragraphCSS = css`
  font-size: 1.4rem;
  line-height: ${1.4 * LINE_HEIGHT_SCALE}rem;
  word-break: keep-all;
  margin-bottom: 1rem;
`;

export const orderedListCSS = css`
  font-size: 1.4rem;
  line-height: ${1.4 * LINE_HEIGHT_SCALE}rem;
`;

export const labelCSS = css`
  font-size: 1.4rem;
  line-height: ${1.4 * LINE_HEIGHT_SCALE}rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

export const inputCSS = css`
  width: 100%;
  border: 1px solid ${PALETTE.BLACK_700};
  border-radius: 10px;
  font-size: 1.2rem;
  line-height: ${1.2 * LINE_HEIGHT_SCALE}rem;
  padding: 0.7rem 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${PALETTE.BLACK_700};
  }
`;

export const contentBoxCSS = css`
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem;
  background-color: ${PALETTE.WHITE};
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
`;

export const fadeInDirectionCSS: { [key in FadeInDirection]: (on: boolean) => FlattenSimpleInterpolation } = {
  left: (on: boolean) =>
    css`
      top: 0;
      bottom: 0;
      left: 0;
      transform: ${on ? "translateX(0)" : "translateX(-100%)"};
    `,
  right: (on: boolean) =>
    css`
      top: 0;
      bottom: 0;
      right: 0;
      transform: ${on ? "translateX(0)" : "translateX(100%)"};
    `,
  top: (on: boolean) =>
    css`
      right: 0;
      left: 0;
      top: 0;
      transform: ${on ? "translateY(0)" : "translateY(-100%)"};
    `,
  bottom: (on: boolean) =>
    css`
      right: 0;
      left: 0;
      bottom: 0;
      transform: ${on ? "translateY(0)" : "translateY(100%)"};
    `,
  center: (on: boolean) => css`
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
    visibility: ${on ? "visible" : "hidden"};
  `,
  back: (on: boolean) => css`
    visibility: ${on ? "visible" : "hidden"};
  `
};

export const ShakeCSS = css`
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translateY(0);
  backface-visibility: hidden;
  perspective: 1000px;

  @keyframes shake {
    10%,
    90% {
      transform: translateY(0);
    }

    20%,
    80% {
      transform: translateY(-5px);
    }

    30%,
    50%,
    70% {
      transform: translateY(0);
    }

    40%,
    60% {
      transform: translateY(-5px);
    }
  }
`;
