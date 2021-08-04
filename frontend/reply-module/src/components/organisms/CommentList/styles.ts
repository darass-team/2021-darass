import { PALETTE } from "./../../../styles/palette";
import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const OrderButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  border-bottom: 1px solid ${PALETTE.BLACK_700};
  padding-bottom: 1.6rem;
`;

export const OrderButtonWrapper = styled.div`
  display: flex;

  & > button:not(:last-child) {
    margin-right: 1.2rem;
  }
`;

export const OrderButton = styled.button<{ isSelected: boolean }>`
  color: ${props => (props.isSelected ? PALETTE.BLACK_700 : PALETTE.GRAY_500)};
  font-size: 1.6rem;
  font-weight: 700;
  background-color: transparent;
  transition: color 0.1s;

  &:hover {
    color: ${props => !props.isSelected && PALETTE.BLACK_700};
  }
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem 0;

  & > * {
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const Notice = styled.span`
  padding: 1.5rem 0;
  min-height: 7rem;
  font-size: 1.6rem;
  text-align: center;
  white-space: pre;
`;
