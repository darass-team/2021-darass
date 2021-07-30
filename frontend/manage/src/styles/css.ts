import { css } from "styled-components";
import { PALETTE } from "./palette";

export const crossBrowsingPrefix = (property: string, value: string) => {
  return `
    ${property}: ${value};
    -webkit-${property}: ${value};
    --moz-${property}: ${value};
    --o-${property}: ${value};
    --ms-${property}: ${value};
  `;
};

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
  font-weight: 800;
  margin-bottom: 2rem;
`;

export const subTitleCSS = css`
  font-size: 1.6rem;
  word-break: keep-all;
  margin-bottom: 1rem;
`;

export const paragraphCSS = css`
  font-size: 1.4rem;
  word-break: keep-all;
  margin-bottom: 1rem;
`;

export const orderedListCSS = css`
  font-size: 1.4rem;
`;

export const labelCSS = css`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

export const inputCSS = css`
  width: 100%;
  border: 1px solid ${PALETTE.BLACK_700};
  border-radius: 10px;
  font-size: 1.2rem;
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
