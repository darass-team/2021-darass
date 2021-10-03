import downRightArrowSVG from "@/assets/svg/down-right-arrow.svg";
import Comment, { Props as CommentProps } from "@/components/molecules/Comment";
import { CommentWrapper, Container, IndentTab } from "./styles";

export interface Props extends CommentProps {}

const SubComment = ({ ...thisCommentInfo }: Props) => {
  return (
    <Container>
      <IndentTab src={downRightArrowSVG} />
      <CommentWrapper>
        <Comment {...thisCommentInfo} />
      </CommentWrapper>
    </Container>
  );
};

export default SubComment;
