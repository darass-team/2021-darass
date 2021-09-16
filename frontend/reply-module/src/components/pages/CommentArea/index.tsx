import { useEffect, useState } from "react";
import kakaoTalkIcon from "../../../assets/png/kakaotalk.png";
import naverIcon from "../../../assets/png/naver.png";
import { MANAGE_PAGE_DOMAIN } from "../../../constants/domain";
import { OAUTH_URL } from "../../../constants/oauth";
import { ORDER_BUTTON } from "../../../constants/orderButton";
import { useGetAllComments, useGetProject, useUser } from "../../../hooks";
import { AlertError } from "../../../utils/Error";
import { popUpCenter } from "../../../utils/popUpCenter";
import { postScrollHeightToParentWindow } from "../../../utils/postMessage";
import Avatar from "../../atoms/Avatar";
import CommentInput from "../../organisms/CommentInput";
import Footer from "../../organisms/Footer";
import {
  CommentList,
  Container,
  LoginMethod,
  LoginMethodWrapper,
  UserAvatarOption,
  UserAvatarOptionButton,
  UserAvatarOptionLink
} from "./styles";

const CommentArea = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const url = urlParams.get("url");
  const projectSecretKey = urlParams.get("projectKey");

  const [sortOption, setSortOption] = useState<keyof typeof ORDER_BUTTON>("oldest");
  const [notice, setNotice] = useState("");

  const { user, logout } = useUser();
  const {
    totalCommentsCount,
    comments,
    refetch: refetchAllComments,
    isLoading: commentsLoading,
    error: commentsError
  } = useGetAllComments({ url, projectSecretKey, sortOption });
  const { project, isLoading: projectLoading, error: projectError } = useGetProject({ projectSecretKey });

  useEffect(() => {
    postScrollHeightToParentWindow();
  }, [comments]);

  useEffect(() => {
    refetchAllComments();
  }, [sortOption]);

  useEffect(() => {
    if (projectLoading || commentsLoading) return;

    if (!url) {
      setNotice("URL을 확인해주세요.");
      return;
    }
    if (!projectSecretKey) {
      setNotice("project secret key를 확인해주세요.");
      return;
    }
    if (projectError) {
      setNotice(projectError.message);
      return;
    }
    if (commentsError) {
      setNotice(commentsError.message);
      return;
    }

    if (!(projectError || commentsError)) {
      if (totalCommentsCount === 0) {
        setNotice("작성된 댓글이 없습니다.");
        return;
      }

      setNotice("");
    }
  }, [projectLoading, commentsLoading, projectError, commentsError, totalCommentsCount]);

  const onLogin = async (provider: keyof typeof OAUTH_URL) => {
    try {
      const popUp = popUpCenter(OAUTH_URL[provider], "Authentication", 600, 900, "modal=yes,alwaysRaised=yes");

      const popUpcheckIntervalId = setInterval(() => {
        if (!popUp || !popUp.closed) return;

        clearInterval(popUpcheckIntervalId);

        window.location.reload();
      }, 300);
    } catch (error) {
      if (error instanceof AlertError) {
        alert(error.message);
      }
    }
  };

  const onSelectSortOption = (sortOption: keyof typeof ORDER_BUTTON) => {
    setSortOption(sortOption);
  };

  return (
    <Container>
      <CommentList
        user={user}
        isLoading={projectLoading || commentsLoading}
        totalCommentsCount={totalCommentsCount || 0}
        comments={comments || []}
        project={project}
        sortOption={sortOption}
        onSelectSortOption={onSelectSortOption}
        notice={notice}
      />
      <UserAvatarOption user={user}>
        {user ? (
          <>
            <UserAvatarOptionLink href={`${MANAGE_PAGE_DOMAIN}/user`} target="_blank" rel="noopener noreferrer">
              내 정보
            </UserAvatarOptionLink>
            <UserAvatarOptionButton type="button" onClick={logout}>
              로그아웃
            </UserAvatarOptionButton>
          </>
        ) : (
          <>
            <LoginMethodWrapper onClick={() => onLogin("KAKAO")}>
              <Avatar size="SM" imageURL={kakaoTalkIcon} alt="카카오톡 로그인 이미지" />
              <LoginMethod>카카오</LoginMethod>
            </LoginMethodWrapper>
            <LoginMethodWrapper onClick={() => onLogin("NAVER")}>
              <Avatar size="SM" imageURL={naverIcon} alt="네아버 로그인 이미지" />
              <LoginMethod>네이버</LoginMethod>
            </LoginMethodWrapper>
          </>
        )}
      </UserAvatarOption>
      <CommentInput user={user} />
      <Footer />
    </Container>
  );
};

export default CommentArea;
