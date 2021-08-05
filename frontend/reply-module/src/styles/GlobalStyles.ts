import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { PALETTE } from "./palette";

const GlobalStyles = createGlobalStyle`
      ${normalize}
      * {
        box-sizing: border-box;
      }
      html { 
        font-size: 14px;
        font-family: 'Noto Sans KR', sans-serif;
      }
      html, body {
        margin: 0;
        padding: 0 1px;
        line-height: 1.5rem;
        width: 100%;
        color: ${PALETTE.BLACK_700};
        margin: 0 auto;
      }
      @media all and (max-width:580px) {
        html {
          font-size: 12px;
        }
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      h1,
      h2,
      h3,
      h4,
      h5 {
        font-size: 1rem;
        margin: 0;
        padding: 0;
      }
      a {
        text-decoration: none;
        outline: none;
        &:link,
        &:visited,
        &:hover,
        &:active,
        &:focus {
          text-decoration: none;
          color: ${PALETTE.BLACK_700}
        }
      }
      img {
        object-fit: cover;
      }
      button {
        font-family: inherit;
        outline: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0;

        &:disabled {
          cursor: not-allowed;
        }
      }
      input, textarea {
        font-family: inherit;
      }
`;

export default GlobalStyles;
