import styled, { css } from "styled-components";
import { PALETTE } from "@/constants/styles/palette";
import CancelButtonComponent from "@/components/@atoms/CancelButton";

export const Container = styled.div<{ isSubComment: boolean }>`
  width: 100%;

  background-color: ${props => (props.isSubComment ? PALETTE.GRAY_300 : PALETTE.GRAY_100)};
  border-radius: 10px;
  padding: 0.8rem 1rem;
  display: flex;
  flex-direction: column;

  transition: all 0.3s linear;
`;

const createMetaUserInfo = ({
  thisCommentIsWrittenByAdmin,
  isSecretComment,
  isReadable
}: {
  thisCommentIsWrittenByAdmin: boolean;
  isSecretComment: boolean;
  isReadable: boolean;
}) => {
  let content = "";

  if (thisCommentIsWrittenByAdmin && isReadable) content += "운영자";
  if (isSecretComment) {
    content += ` ${isReadable ? "🔓" : "🔒"}`;
  }

  return content;
};

export const Name = styled.div<{
  thisCommentIsWrittenByAdmin: boolean;
  isSecretComment: boolean;
  isReadable: boolean;
}>`
  font-weight: 700;
  font-size: 1.1rem;
  line-height: 1.65rem;
  margin-bottom: 0.2rem;
  margin-right: 2rem;

  ${({ thisCommentIsWrittenByAdmin, isSecretComment, isReadable }) => {
    const text = createMetaUserInfo({ thisCommentIsWrittenByAdmin, isSecretComment, isReadable });

    return css`
      &:after {
        content: "${text}";
        font-size: 0.9rem;
        line-height: 1.35rem;
        margin-left: 0.3rem;
        color: ${PALETTE.INDIGO_600};
      }
    `;
  }};
`;

export const Text = styled.textarea<{
  isSubComment: boolean;
  editable: boolean;
  isSecretComment: boolean;
  isReadable: boolean;
}>`
  outline-color: ${PALETTE.BLACK_700};
  border: ${({ editable }) => !editable && "none"};
  background-color: ${props => {
    if (props.editable) {
      return PALETTE.WHITE;
    }
    if (props.isSubComment) {
      return PALETTE.GRAY_300;
    }

    return PALETTE.GRAY_100;
  }};

  color: ${props => {
    if (props.isSecretComment && !props.isReadable) {
      return PALETTE.GRAY_700;
    }

    return PALETTE.BLACK_900;
  }};

  padding: 0.2rem 0.3rem 0.2rem 0.1rem;
  min-width: 14rem;
  border-radius: 0.3rem;
  word-break: break-all;
  white-space: break-spaces;
  font-size: 1.2rem;
  line-height: 1.8rem;
  resize: none;

  & > a {
    color: ${PALETTE.BLUE_700};
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  margin-bottom: 0.5rem;
  align-items: center;
  justify-content: flex-start;

  & > button {
    padding: 0;
    width: 4rem;
    height: 2.4rem;
    font-size: 1rem;
    line-height: 1.5rem;
    border-radius: 10px;
  }
`;

export const CancelButton = styled(CancelButtonComponent)`
  margin-left: auto;
  margin-right: 0.5rem;
`;
