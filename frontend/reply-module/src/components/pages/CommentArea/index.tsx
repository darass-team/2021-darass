import { PNG } from "@/constants/clientAssets";
import Avatar from "@/components/@atoms/Avatar";
import CommentInput from "@/components/@molecules/CommentInput";
import Footer from "@/components/@molecules/Footer";
import LoadingPage from "@/components/@molecules/LoadingPage";
import UserAvatarOption from "@/components/@molecules/UserAvatarOption";
import { MANAGE_PAGE_DOMAIN } from "@/constants/domain";
import { OAUTH_URL } from "@/constants/oauth";
import { ORDER_BUTTON } from "@/constants/orderButton";
import { useGetAllComments, useGetProjectOwnerId, useMessageChannelFromReplyModuleContext } from "@/hooks";
import { CommentContext } from "@/hooks/contexts/useCommentContext";
import { useUserContext } from "@/hooks/contexts/useUserContext";
import { popUpCenter } from "@/utils/popUpCenter";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import {
  CommentInputHeader,
  CommentList,
  Container,
  LoginMethod,
  LoginMethodWrapper,
  UserAvatarOptionButton,
  UserAvatarOptionLink
} from "./styles";

interface Props {
  isVisible: boolean;
}

const CommentArea = ({ isVisible }: Props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const url = urlParams.get("url");
  const projectSecretKey = urlParams.get("projectKey");

  const [sortOption, setSortOption] = useState<keyof typeof ORDER_BUTTON>("oldest");
  const [notice, setNotice] = useState("");

  const { user, logout, refetchAccessToken } = useUserContext();

  const {
    uiInfo: { isAllowSocialLogin }
  } = useContext(ThemeContext);

  const {
    totalCommentsCount,
    comments,
    refetch: refetchAllComments,
    isLoading: commentsLoading,
    error: commentsError,
    setComments,
    isFetched
  } = useGetAllComments({ url, projectSecretKey, sortOption });
  const {
    projectOwnerId,
    isLoading: getProjectOwnerIdLoading,
    error: getProjectOwnerError
  } = useGetProjectOwnerId(projectSecretKey || "");
  const { setScrollHeight } = useMessageChannelFromReplyModuleContext();

  useEffect(() => {
    setScrollHeight();
  }, [comments]);

  useEffect(() => {
    if (getProjectOwnerIdLoading || commentsLoading) return;

    if (!url) {
      setNotice("URL을 확인해주세요.");
      return;
    }
    if (!projectSecretKey) {
      setNotice("project secret key를 확인해주세요.");
      return;
    }
    if (getProjectOwnerError) {
      setNotice(getProjectOwnerError.message);
      return;
    }
    if (commentsError) {
      setNotice(commentsError.message);
      return;
    }

    if (!(getProjectOwnerError || commentsError)) {
      if (totalCommentsCount === 0) {
        setNotice("작성된 댓글이 없습니다.");
        return;
      }

      setNotice("");
    }
  }, [getProjectOwnerIdLoading, commentsLoading, getProjectOwnerError, commentsError, totalCommentsCount]);

  const onLogin = async (provider: keyof typeof OAUTH_URL) => {
    const popUp = popUpCenter(OAUTH_URL[provider], "Authentication", 600, 900, "modal=yes,alwaysRaised=yes");

    const timerId = setInterval(() => {
      if (!popUp || !popUp.closed) return;

      clearInterval(timerId);
      refetchAccessToken();
    }, 1000);
  };

  const onSelectSortOption = async (sortOption: keyof typeof ORDER_BUTTON) => {
    setSortOption(sortOption);
  };

  useEffect(() => {
    refetchAllComments();
  }, [sortOption]);

  return (
    <CommentContext.Provider
      value={{
        refetchAllComment: refetchAllComments,
        setComments: setComments,
        comments
      }}
    >
      <Container isVisible={isVisible}>
        <CommentList
          user={user}
          totalCommentsCount={totalCommentsCount}
          comments={comments}
          projectOwnerId={projectOwnerId}
          sortOption={sortOption}
          onSelectSortOption={onSelectSortOption}
          notice={notice}
          isVisible={!!projectOwnerId && !getProjectOwnerIdLoading && isFetched}
          data-testid="comment-list"
        />

        {isAllowSocialLogin && (
          <CommentInputHeader>
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
                    <Avatar size="SM" imageURL={PNG.KAKAO_LOGO} alt="카카오톡 로그인 이미지" />
                    <LoginMethod>카카오</LoginMethod>
                  </LoginMethodWrapper>
                  <LoginMethodWrapper onClick={() => onLogin("NAVER")}>
                    <Avatar size="SM" imageURL={PNG.NAVER_LOGO} alt="네아버 로그인 이미지" />
                    <LoginMethod>네이버</LoginMethod>
                  </LoginMethodWrapper>
                </>
              )}
            </UserAvatarOption>
          </CommentInputHeader>
        )}

        <CommentInput isSubComment={false} user={user} />
        <Footer />
      </Container>
    </CommentContext.Provider>
  );
};

export default CommentArea;
