import { Comment } from "../../../types";
import { User } from "../../../types/user";
import UserAvatarOption from "../../molecules/UserAvatarOption";
import CommentInput from "../../organisms/CommentInput";
import { Container, Header, CommentCount, CommentCountWrapper, CommentList } from "./styles";
import { CreateCommentRequestData } from "../../../types/comment";

export interface Props {
  user: User | undefined;
  comments: Comment[] | undefined;
  onLogin: () => void;
  onLogout: () => void;
  createComment: (data: CreateCommentRequestData) => Promise<Comment>;
  url: string | null;
  projectSecretKey: string | null;
}

const CommentArea = ({ user, comments = [], onLogin, onLogout, createComment, projectSecretKey, url }: Props) => {
  return (
    <Container>
      <Header>
        <CommentCountWrapper>
          댓글 <CommentCount>{comments.length}</CommentCount>
        </CommentCountWrapper>

        <UserAvatarOption user={user}>
          {user ? (
            <button type="button" onClick={onLogout}>
              로그아웃
            </button>
          ) : (
            <button type="button" onClick={onLogin}>
              카카오로 로그인
            </button>
          )}
        </UserAvatarOption>
      </Header>
      <CommentInput url={url} projectSecretKey={projectSecretKey} createComment={createComment} user={user} />
      <CommentList comments={comments} />
    </Container>
  );
};

export default CommentArea;
