import { createGlobalStyle } from "styled-components";
import { PALETTE } from "./palette";

const GlobalStyles = createGlobalStyle`
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;800&display=swap');
      
      * {
        box-sizing: border-box;
      }
      html { 
          font-size: 16px;
          font-family: 'Noto Sans KR', sans-serif;
      }
      html, body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        width: 100%;
        color: ${PALETTE.BLACK_700};
        margin: 0 auto;
      }
      @media all and (max-width:780px) {
        html {
          font-size: 10px;
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
      }
      input, textarea {
        font-family: inherit;
      }
`;

export default GlobalStyles;
