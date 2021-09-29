import { LINE_HEIGHT_SCALE } from "@/constants/styles/constants";
import styled from "styled-components";

export const Container = styled.div`
  margin: 4rem 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TextArea = styled.div`
  margin-top: 2rem;
  margin-bottom: 8rem;
  width: 100%;
  height: 100%;
  display: table;
  text-align: center;
  font-size: 1.2rem;
  line-height: ${1.2 * LINE_HEIGHT_SCALE}rem;

  > h2 {
    font-size: 2rem;
    line-height: ${2 * LINE_HEIGHT_SCALE}rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  > p {
    white-space: pre-wrap;
  }
`;

export const Img = styled.img`
  @keyframes fall {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(210deg);
    }
  }

  @keyframes swing {
    from {
      transform: rotate(210deg);
    }
    to {
      transform: rotate(150deg);
    }
  }

  @keyframes sway {
    0% {
      transform: rotate(150deg);
    }
    50% {
      transform: rotate(210deg);
    }
    100% {
      transform: rotate(150deg);
    }
  }

  width: 6rem;
  height: 6rem;

  transform-origin: 50% 200%;

  animation: fall 1s 1s ease-in-out, swing 1s 2s ease-in-out, sway 3s 3s infinite alternate ease-in-out;
`;
