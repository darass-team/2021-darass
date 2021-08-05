import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "../../../styles/constants";
import { contentBoxCSS, titleCSS } from "../../../styles/css";
import AvatarComponent from "../../atoms/Avatar";
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

export const Header = styled(Row.withComponent("header"))`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${PALETTE.GRAY_400};
  border-bottom: 0;
`;

export const Avatar = styled(AvatarComponent)`
  width: 4rem;
  height: 4rem;
`;

export const ContentWrapper = styled.div`
  width: 100%;
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
