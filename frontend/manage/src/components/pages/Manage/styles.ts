import styled from "styled-components";
import { COMMENT_COUNT_PER_PAGE } from "@/constants/pagination";
import { contentBoxCSS, titleCSS } from "@/constants/styles/css";
import DeleteButtonComponent from "@/components/atoms/Buttons/DeleteButton";
import { PALETTE } from "@/constants/styles/palette";

export const Container = styled.div`
  ${contentBoxCSS};
`;

export const Title = styled.h2`
  ${titleCSS};
`;

export const CommentsViewer = styled.div<{ isFetchedGetCommentsOfProjectPerPage: boolean }>`
  transition: all 0.3s;
  opacity: ${({ isFetchedGetCommentsOfProjectPerPage }) => (isFetchedGetCommentsOfProjectPerPage ? 1 : 0)};
  width: 100%;
  min-height: 50vh;
  padding: 1rem 0;
`;

export const CommentList = styled.ul`
  width: 100%;
  min-height: ${8 * COMMENT_COUNT_PER_PAGE}rem;
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

export const TotalComment = styled.div`
  padding: 1rem;
  font-size: 1.2rem;

  & > span:first-child {
    font-size: 1.5rem;
    margin-right: 0.3rem;
    font-weight: 700;
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
