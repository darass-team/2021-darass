import Comment, { Props as CommentProps } from "@/components/@organisms/Comment";
import { CommentWrapper, Container, IndentTab } from "./styles";
import { SVG } from "@/constants/clientAssets";

export interface Props extends CommentProps {}

const SubComment = ({ ...thisCommentInfo }: Props) => {
  return (
    <Container>
      <IndentTab src={SVG.DOWN_RIGHT_ARROW} data-testid="subcomment-indent-icon" />
      <CommentWrapper>
        <Comment {...thisCommentInfo} />
      </CommentWrapper>
    </Container>
  );
};

export default SubComment;
