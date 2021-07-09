import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

const Container = styled.div`
  position: absolute;
`;

const OptionIcon = styled.img`
  cursor: pointer;
`;

const OptionContainer = styled.div`
  position: absolute;
  right: -5px;
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
    border: none;
    outline: none;
    background-color: ${PALETTE.WHITE};
    cursor: pointer;
    font-weight: 600;
    margin-bottom: 0.3rem;

    :first-child {
      padding-top: 0.5rem;
      border-radius: 10px 10px 0 0;
    }

    :last-child {
      margin-bottom: 0;
      padding-bottom: 0.5rem;
      border-radius: 0 0 10px 10px;
    }
  }
`;

const EditButton = styled.button`
  color: ${PALETTE.BLACK_700};
`;
const DeleteButton = styled.button`
  color: ${PALETTE.RED_600};
`;

export { Container, OptionIcon, OptionContainer, EditButton, DeleteButton };
