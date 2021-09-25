import { css } from "styled-components";
import { PALETTE } from "./palette";

export const contentBoxCSS = css`
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem;
  background-color: ${PALETTE.WHITE};
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
`;

export const InputCSS = css`
  box-sizing: border-box;
  border: 1px solid ${PALETTE.GRAY_500};
  border-radius: 10px;
  color: ${PALETTE.BLACK_700};
  font-size: 1.2rem;
  line-height: 1.8rem;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 1px ${PALETTE.BLACK_700};
  }

  &::placeholder {
    color: ${PALETTE.GRAY_600};
  }
`;

export const SpeechBubbleCSS = css`
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
    top: -7px;
    right: 8px;

    border-bottom: 10px solid ${PALETTE.WHITE};
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
`;

export const SkeletonCSS = css`
  position: relative;
  overflow: hidden;
  background-color: rgba(165, 165, 165, 0.3);

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 33%,
      rgba(255, 255, 255, 0.6) 66%,
      rgba(255, 255, 255, 0)
    );
    animation: 1s ease-in-out 0s infinite forwards skeleton-gradient;
  }

  @keyframes skeleton-gradient {
    100% {
      transform: translateX(100%);
    }
  }
`;
