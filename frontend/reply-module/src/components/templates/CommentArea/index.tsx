import { Comment } from "../../../types";
import CommentInput from "../../organisms/CommentInput";
import CommentList from "../../organisms/CommentList";
import { Container } from "./styles";

const CommentArea = () => {
  const comments: Comment[] = [];
  return (
    <Container>
      <CommentInput />
      <CommentList comments={comments} />
    </Container>
  );
};

export default CommentArea;
