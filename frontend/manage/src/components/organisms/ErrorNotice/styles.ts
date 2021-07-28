import styled from "styled-components";
import { Z_INDEX } from "../../../styles/constants";

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
  width: 100%;
  height: 100%;
  display: table;
  text-align: center;
  font-size: 1.2rem;

  > h2 {
    font-size: 2rem;
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
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(210deg);
    }
  }

  @keyframes swing {
    from {
      -webkit-transform: rotate(210deg);
    }
    to {
      -webkit-transform: rotate(150deg);
    }
  }

  @keyframes sway {
    0% {
      -webkit-transform: rotate(150deg);
    }
    50% {
      -webkit-transform: rotate(210deg);
    }
    100% {
      -webkit-transform: rotate(150deg);
    }
  }

  z-index: ${Z_INDEX.ERROR_NOTICE};
  width: 6rem;
  height: 6rem;

  transform-origin: 50% 200%;

  animation: fall 1s 2s ease-in-out, swing 1s 3s ease-in-out, sway 3s 4s infinite alternate ease-in-out;
`;
