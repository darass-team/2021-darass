import styled from "styled-components";
import { InputCSS } from "../../../styles/css";
import { PALETTE } from "../../../styles/palette";
import LikingUsersButtonComponent from "../../atoms/Buttons/LikingUsersButton";
import CommentOptionComponent from "../../atoms/CommentOption";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentWrapper = styled.div<{ align: "left" | "right" }>`
  display: flex;
  flex-direction: ${props => (props.align === "left" ? "row" : "row-reverse")};
`;

export const CommentTextBoxWrapper = styled.div<{ align: "left" | "right" }>`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: ${props => (props.align === "left" ? "0 0 0 0.6rem" : "0 0.6rem 0 0")};
`;

export const LikingUsersButton = styled(LikingUsersButtonComponent)`
  position: absolute;
  bottom: 0.5rem;
  right: -1.5rem;

  @media screen and (max-width: 768px) {
    bottom: 0.5rem;
  }
`;

export const CommentBottomWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.3rem 1rem 0 1rem;

  & > *:not(:first-child):before {
    content: "·";
    color: ${PALETTE.BLACK_700};
    margin: 0 0.3rem;
  }
`;

export const LikeButton = styled.button<{ isLiked: boolean }>`
  background-color: transparent;
  color: ${props => (props.isLiked ? PALETTE.BLUE_700 : PALETTE.BLACK_700)};

  &:hover {
    color: ${props => (props.isLiked ? PALETTE.BLACK_700 : PALETTE.BLUE_700)};
  }
`;

export const Time = styled.span`
  font-size: 0.8rem;
`;

export const CommentOption = styled(CommentOptionComponent)`
  position: absolute;
  right: 1rem;
  top: 0.75rem;
`;

export const PasswordForm = styled.form``;

export const PasswordInput = styled.input<{ isValidInput: Boolean }>`
  ${InputCSS};
  border: ${props => !props.isValidInput && `3px solid ${PALETTE.RED_600}`};
  margin-right: 1.2rem;
  margin-left: calc(40px + 0.6rem);
  height: 2.4rem;
  padding: 0.6rem;
  width: 12rem;
  font-size: 0.8rem;
`;

export const Button = styled.button`
  width: 4rem;
  height: 2.4rem;
  background-color: ${PALETTE.SECONDARY};
  color: ${PALETTE.WHITE};
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 10px;
  margin-top: 1rem;
  margin-left: auto;

  &:disabled {
    background-color: ${PALETTE.SECONDARY};
  }
`;

export const CancelButton = styled(Button)`
  background-color: ${PALETTE.RED_600};
  margin-right: 0.5rem;
`;
