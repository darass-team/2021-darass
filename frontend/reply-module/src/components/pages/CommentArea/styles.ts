import CommentListComponent from "@/components/@templates/CommentList";
import styled from "styled-components";

export const Container = styled.section<{ isVisible: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: all 0.5s;
`;

export const CommentList = styled(CommentListComponent)`
  margin-top: 3rem;
`;

export const LoginMethodWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export const CommentInputHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const UserAvatarOptionButton = styled.button`
  font-weight: 700;
  background-color: transparent;
`;

export const LoginMethod = styled(UserAvatarOptionButton)`
  margin-left: 0.5rem;
`;

export const UserAvatarOptionLink = styled(UserAvatarOptionButton.withComponent("a"))``;
