import { Name as CommentTextBoxName, Text as CommentTextBoxText } from "./../../atoms/CommentTextBox/styles";
import styled from "styled-components";
import { SkeletonCSS } from "../../../constants/styles/css";

export const Avatar = styled.div`
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  ${SkeletonCSS};
`;

export const Name = styled(CommentTextBoxName)`
  ${SkeletonCSS};
  width: 5rem;
  height: 1.2rem;
  border-radius: 0.3rem;
  margin-bottom: 0.5rem;
`;

export const Text = styled(CommentTextBoxText)`
  ${SkeletonCSS};
  width: 20rem;
  height: 1.2rem;
  margin: 0.2rem 0.3rem 0.2rem 0.1rem;
`;

export const Buttons = styled.div`
  ${SkeletonCSS};
  width: 12rem;
  height: 1rem;
  border-radius: 0.3rem;
`;
