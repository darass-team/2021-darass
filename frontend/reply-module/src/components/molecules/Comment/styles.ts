import styled from "styled-components";
import { InputCSS } from "../../../constants/styles/css";
import { PALETTE } from "../../../constants/styles/palette";
import DeleteButton from "../../atoms/Buttons/DeleteButton";
import LikingUsersButtonComponent from "../../atoms/Buttons/LikingUsersButton";
import SubmitButtonComponent from "../../atoms/Buttons/SubmitButton";
import CommentOptionComponent from "../../atoms/CommentOption";
import CommentInputComponent from "../../organisms/CommentInput";

export const Container = styled.div<{ isSubComment?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-left: ${props => props.isSubComment && "3rem"};
  margin-bottom: 1.5rem;
`;

export const CommentWrapper = styled.div`
  display: flex;
`;

export const DownRightArrow = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.3rem 0.4rem 0 0.4rem;
`;

export const CommentTextBoxWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 0 0 0.6rem;
`;

export const LikingUsersButton = styled(LikingUsersButtonComponent)`
  position: absolute;
  bottom: 0.7rem;
  right: -1.5rem;
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

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${props => (props.isLiked ? PALETTE.BLACK_700 : PALETTE.BLUE_700)};
    }
  }
`;

export const AddSubCommentButton = styled.button`
  background-color: transparent;
  color: ${PALETTE.BLACK_700};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${PALETTE.BLUE_700};
    }
  }
`;

export const Time = styled.span`
  font-size: 0.8rem;
  line-height: 1.2rem;
`;

export const CommentOption = styled(CommentOptionComponent)`
  position: absolute;
  right: 1rem;
  top: 0.75rem;
`;

export const PasswordForm = styled.form<{ isSubComment: boolean }>`
  display: flex;
  align-items: center;
  margin-left: ${props => (props.isSubComment ? "calc(2.5rem + 0.6rem + 2.1rem)" : "3rem")};

  @media all and (max-width: 780px) {
    width: 17rem;
    flex-direction: column;
  }
`;

export const PasswordInput = styled.input<{ isValidInput: Boolean }>`
  ${InputCSS};
  border: ${props => !props.isValidInput && `3px solid ${PALETTE.RED_600}`};
  margin-top: 1rem;
  height: 2.4rem;
  padding: 0.6rem;
  font-size: 1rem;
  line-height: 1.5rem;

  @media all and (min-width: 780px) {
    width: 17rem;
    margin-right: 1.6rem;
  }
  @media all and (max-width: 780px) {
    width: 100%;
  }
`;

export const PasswordButtonWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  gap: 0.5rem;

  @media all and (max-width: 780px) {
    margin-left: auto;
  }
`;

export const SubmitButton = styled(SubmitButtonComponent)`
  width: 4rem;
  height: 2.4rem;
  padding: 0.2rem 0.3rem;
  background-color: ${PALETTE.SECONDARY};
  font-size: 1rem;
  line-height: 1.5rem;
`;

export const CancelButton = styled(DeleteButton)`
  width: 4rem;
  height: 2.4rem;
  padding: 0.2rem 0.3rem;
  font-size: 1rem;
  line-height: 1.5rem;
`;

export const CommentInput = styled(CommentInputComponent)`
  margin-left: 3rem;
`;
