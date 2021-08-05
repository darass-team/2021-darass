import { PALETTE } from "./../../../styles/palette";
import styled from "styled-components";
import { contentBoxCSS, titleCSS } from "../../../styles/css";
import { LINE_HEIGHT_SCALE } from "../../../styles/constants";
import AvatarComponent from "../../atoms/Avatar";
import DeleteButtonComponent from "../../atoms/Buttons/DeleteButton";
import SubmitButton from "../../atoms/Buttons/SubmitButton";

export const Container = styled.div`
  ${contentBoxCSS}
`;

export const Title = styled.h2`
  ${titleCSS};
`;

export const CommentList = styled.ul`
  width: 100%;
  min-height: 50vh;
  padding: 1rem;
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

export const SearchCondition = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
`;

export const Header = styled(Row.withComponent("header"))`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${PALETTE.GRAY_400};
  margin-bottom: 1rem;
`;

export const DateInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    &:not(:first-child) {
      margin-left: 0.5rem;
    }
  }
`;

export const DateInputText = styled.span`
  border-radius: 10px;
  border: 1px solid ${PALETTE.GRAY_400};
  padding: 0.5rem;
  user-select: none;
  cursor: pointer;
`;

export const Avatar = styled(AvatarComponent)`
  width: 4rem;
  height: 4rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentMeta = styled.div`
  display: flex;
  align-items: center;
`;

export const Name = styled.span`
  font-size: 1.2rem;
  line-height: ${1.2 * LINE_HEIGHT_SCALE}rem;
  font-weight: 600;
  margin-right: 1rem;
  color: ${PALETTE.SECONDARY};
`;

export const Date = styled.span``;

export const Content = styled.span`
  font-size: 1.2rem;
  line-height: ${1.2 * LINE_HEIGHT_SCALE}rem;
  margin: 0.5rem 0;
`;

export const Url = styled.span`
  color: ${PALETTE.GRAY_500};
`;

export const DeleteButton = styled(DeleteButtonComponent)`
  width: fit-content;
  height: fit-content;
  font-size: 1.2rem;
`;
