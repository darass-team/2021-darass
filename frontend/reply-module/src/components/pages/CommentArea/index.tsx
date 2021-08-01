import { useEffect } from "react";
import kakaoTalkIcon from "../../../assets/png/kakaotalk.png";
import { useGetAllComments, useProject, useUser } from "../../../hooks";
import { postScrollHeightToParentWindow } from "../../../utils/iframePostMessage";
import Avatar from "../../atoms/Avatar";
import UserAvatarOption from "../../molecules/UserAvatarOption";
import CommentInput from "../../organisms/CommentInput";
import {
  CommentCount,
  CommentCountWrapper,
  CommentList,
  Container,
  Header,
  LoginMethod,
  LoginMethodWrapper,
  LogOut
} from "./styles";

const CommentArea = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const url = urlParams.get("url");
  const projectSecretKey = urlParams.get("projectKey");

  const { user, login, logout } = useUser();
  const { comments } = useGetAllComments({ url, projectSecretKey });
  const { project } = useProject({ projectSecretKey });

  useEffect(() => {
    postScrollHeightToParentWindow();
  }, [comments]);

  return (
    <Container>
      <Header>
        <CommentCountWrapper>
          댓글 <CommentCount>{comments?.length || 0}</CommentCount>
        </CommentCountWrapper>

        <UserAvatarOption user={user}>
          {user ? (
            <LogOut type="button" onClick={logout}>
              로그아웃
            </LogOut>
          ) : (
            <>
              <LoginMethodWrapper onClick={login}>
                <Avatar size="SM" imageURL={kakaoTalkIcon} alt="카카오톡 로그인 이미지" />
                <LoginMethod>카카오</LoginMethod>
              </LoginMethodWrapper>
            </>
          )}
        </UserAvatarOption>
      </Header>
      <CommentInput url={url} projectSecretKey={projectSecretKey} user={user} />
      <CommentList user={user} comments={comments || []} project={project} />
    </Container>
  );
};

export default CommentArea;
