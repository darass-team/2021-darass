import { PALETTE } from "../../../constants/styles/palette";
import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid ${PALETTE.GRAY_400};
  padding-bottom: 0.8rem;
`;

export const CommentCountWrapper = styled.div`
  display: flex;
  font-size: 1.4rem;
  line-height: 2.1rem;
  word-break: keep-all;
`;

export const CommentCount = styled.span`
  color: ${PALETTE.SECONDARY};
  font-weight: 700;
  margin-left: 0.5rem;
`;

export const OrderButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const OrderButtonWrapper = styled.div`
  display: flex;

  & > button:not(:last-child) {
    margin-right: 1.2rem;
  }
`;

export const OrderButton = styled.button<{ isSelected: boolean }>`
  color: ${props => (props.isSelected ? PALETTE.BLACK_700 : PALETTE.GRAY_500)};
  font-size: 1.2rem;
  line-height: 1.8rem;
  font-weight: 700;
  background-color: transparent;
  transition: color 0.1s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${props => !props.isSelected && PALETTE.BLACK_700};
    }
  }
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem 2rem 3rem 0;

  & > * {
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const Notice = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1.5rem 0;
  min-height: 7rem;
  font-size: 1.4rem;
  line-height: 2.1rem;
  color: ${PALETTE.GRAY_600};
  white-space: break-spaces;
`;
