import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { LINE_HEIGHT_SCALE } from "./constants";
import { PALETTE } from "./palette";

const GlobalStyles = createGlobalStyle`

      ${normalize}

      * {
        box-sizing: border-box;
      }
      html { 
          font-size: 16px;
          font-family: 'Noto Sans KR', sans-serif;
      }
      html, body {
        scroll-behavior: smooth;
        padding: 0;
        height: 100vh;
        width: 100%;
        color: ${PALETTE.BLACK_700};
        margin: 0 auto;
        line-height: ${LINE_HEIGHT_SCALE}rem;
      }
      @media all and (max-width:780px) {
        html {
          font-size: 10px;
        }
      }
      p {
        margin: 0;
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
        color: ${PALETTE.BLACK_700};
        text-decoration: none;
        outline: none;
        &:link,
        &:visited,
        &:hover,
        &:active,
        &:focus {
          text-decoration: none;
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
        background-color: transparent;
      }
      input, textarea {
        font-family: inherit;
      }
`;

export default GlobalStyles;
