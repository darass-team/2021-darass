import AvatarComponent from "@/components/atoms/Avatar";
import LikingUsersButtonComponent from "@/components/atoms/Buttons/LikingUsersButton";
import CommentOptionComponent from "@/components/molecules/CommentOption";
import CommentInputComponent from "@/components/organisms/CommentInput";
import styled from "styled-components";

export const Container = styled.div<{ isSubComment: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

export const Avatar = styled(AvatarComponent)`
  margin-right: 0.6rem;
`;

export const CommentWrapper = styled.div`
  display: flex;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  @media all and (min-width: 580px) {
    width: fit-content;
  }
`;

export const IndentTab = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.3rem 0.4rem 0 0.4rem;
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
`;

export const CommentOption = styled(CommentOptionComponent)`
  position: absolute;
  right: 1rem;
  top: 0.75rem;
`;

export const CommentInput = styled(CommentInputComponent)`
  margin-left: 3rem;
`;
