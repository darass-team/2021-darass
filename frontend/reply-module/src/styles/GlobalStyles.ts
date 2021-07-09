import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;800&display=swap');
      
      * {
        box-sizing: border-box;
      }
      html { 
          font-size: 10px;
          font-family: 'Noto Sans KR', sans-serif;
      }
      html, body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        width: 100%;
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
        color: black;
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
        cursor: pointer;
      }
      input, textarea {
        font-family: inherit;
      }
`;

export default GlobalStyles;
