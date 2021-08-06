import styled from "styled-components";
import { contentBoxCSS, titleCSS } from "../../../styles/css";
import DeleteButtonComponent from "../../atoms/Buttons/DeleteButton";
import { PALETTE } from "./../../../styles/palette";

export const Container = styled.div`
  ${contentBoxCSS}
`;

export const Title = styled.h2`
  ${titleCSS};
`;

export const CommentList = styled.ul`
  width: 100%;
  min-height: 50vh;
  padding: 1rem 0;
`;

export const Row = styled.li`
  width: 100%;
  height: auto;
  border: 1px solid ${PALETTE.GRAY_400};
  border-bottom: none;
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & > * {
    &:not(:first-child) {
      margin-left: 2rem;
    }
  }

  &:last-child {
    border-bottom: 1px solid ${PALETTE.GRAY_400};
  }

  &:nth-child(2n) {
    background-color: ${PALETTE.GRAY_200};
  }
`;

export const Header = styled(Row.withComponent("header"))`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${PALETTE.GRAY_400};
  border-bottom: 0;
`;

export const DeleteButton = styled(DeleteButtonComponent)`
  width: fit-content;
  height: fit-content;
  font-size: 1.2rem;
`;
