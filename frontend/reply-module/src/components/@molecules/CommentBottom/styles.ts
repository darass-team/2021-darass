import { PALETTE } from "@/constants/styles/palette";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 0 0.6rem;

  & > *:not(:first-child):before {
    content: "·";
    color: ${({ theme: { isDarkModePage } }) => (isDarkModePage ? PALETTE.WHITE : PALETTE.BLACK_700)};
    margin: 0 0.3rem;
  }
`;

export const LikeButton = styled.button<{ isLiked: boolean }>`
  background-color: transparent;
  color: ${({ isLiked, theme: { isDarkModePage } }) =>
    isLiked
      ? isDarkModePage
        ? PALETTE.BLUE_500
        : PALETTE.BLUE_700
      : isDarkModePage
      ? PALETTE.WHITE
      : PALETTE.BLACK_700};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${({ isLiked, theme: { isDarkModePage } }) =>
        isLiked
          ? isDarkModePage
            ? PALETTE.WHITE
            : PALETTE.BLACK_700
          : isDarkModePage
          ? PALETTE.BLUE_500
          : PALETTE.BLUE_700};
    }
  }
`;

export const AddSubCommentButton = styled.button`
  background-color: transparent;
  color: ${({ theme: { isDarkModePage } }) => (isDarkModePage ? PALETTE.WHITE : PALETTE.BLACK_700)};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${({ theme: { isDarkModePage } }) => (isDarkModePage ? PALETTE.BLUE_500 : PALETTE.BLUE_700)};
    }
  }
`;

export const Time = styled.span`
  font-size: 0.8rem;
  line-height: 1.2rem;
  color: ${({ theme: { isDarkModePage } }) => (isDarkModePage ? PALETTE.WHITE : PALETTE.BLACK_700)};
`;
