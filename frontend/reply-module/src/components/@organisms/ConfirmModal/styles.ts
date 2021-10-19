import { contentBoxCSS } from "@/constants/styles/css";
import styled from "styled-components";
import { PALETTE } from "@/constants/styles/palette";
import ModalComponent from "@/components/@molecules/Modal";

export const Modal = styled(ModalComponent)`
  padding: 0;
`;

export const Container = styled.div`
  ${contentBoxCSS}
  padding: 0;
  width: 20rem;
  height: fit-content;
  overflow: hidden;
`;

export const Message = styled.span`
  font-size: 1.2rem;
  line-height: 1.8rem;
  font-weight: 700;
  padding: 2rem;
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  border-top: 1px solid ${PALETTE.GRAY_400};
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Button = styled.button`
  font-weight: 700;
  background: transparent;
  flex-grow: 1;
  padding: 1rem 0 1rem 0;
  transition: background-color 0.1s;

  &:first-child {
    border-right: 1px solid ${PALETTE.GRAY_400};
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${PALETTE.WHITE_HOVER};
    }
  }
`;

export const ConfirmButton = styled(Button)`
  color: ${({ theme: { isDarkModePage } }) => (isDarkModePage ? PALETTE.BLUE_500 : PALETTE.BLUE_700)};
  border-radius: 0 0 0 10px;
`;
export const CancelButton = styled(Button)`
  border-radius: 0 0 10px 0;
`;
