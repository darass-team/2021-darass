import styled from "styled-components";
import Avatar from "../../atoms/Avatar";

export const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TextArea = styled.div`
  padding: 80px;
  width: 100%;
  height: 100%;
  display: table;
  text-align: center;
  z-index: 999;
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

  width: 10rem;
  height: 10rem;

  transform-origin: 50% 170%;

  animation: fall 1s 2s ease-in-out, swing 1s 3s ease-in-out, sway 3s 4s infinite alternate ease-in-out;
`;
