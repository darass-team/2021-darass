import kakaoTalkIcon from "@/assets/png/kakaotalk.png";
import naverIcon from "@/assets/png/naver.png";
import Avatar from "@/components/atoms/Avatar";
import CommentInput from "@/components/molecules/CommentInput";
import Footer from "@/components/molecules/Footer";
import { MANAGE_PAGE_DOMAIN } from "@/constants/domain";
import LoadingPage from "../../organisms/LoadingPage";
import {
  CommentList,
  Container,
  LoginMethod,
  LoginMethodWrapper,
  UserAvatarOption,
  UserAvatarOptionButton,
  UserAvatarOptionLink
} from "./styles";
import { useCommentArea } from "./useCommentArea";

const CommentArea = () => {
  const {
    projectOwnerId,
    getProjectOwnerIdLoading,
    commentsLoading,
    user,
    totalCommentsCount,
    comments,
    sortOption,
    onSelectSortOption,
    notice,
    logout,
    onLogin
  } = useCommentArea();

  return (
    <Container>
      {projectOwnerId && !getProjectOwnerIdLoading && !commentsLoading ? (
        <CommentList
          user={user}
          totalCommentsCount={totalCommentsCount}
          comments={comments}
          projectOwnerId={projectOwnerId}
          sortOption={sortOption}
          onSelectSortOption={onSelectSortOption}
          notice={notice}
          data-testid="comment-list"
        />
      ) : (
        <LoadingPage />
      )}

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
      <CommentInput isSubComment={false} user={user} />
      <Footer />
    </Container>
  );
};

export default CommentArea;
