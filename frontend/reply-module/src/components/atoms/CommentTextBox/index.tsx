import { ChangeEvent, useState } from "react";
import { Comment } from "../../../types";
import { User } from "../../../types/user";
import { Button, Container, Name, Text } from "./styles";

export interface Props {
  name: User["nickName"];
  children: Comment["content"];
  contentEditable?: boolean;
  onSubmitEditedComment: (content: Comment["content"]) => void;
}

const CommentTextBox = ({ name, children, contentEditable = false, onSubmitEditedComment }: Props) => {
  const [editedContent, setEditedContent] = useState(children);
  const isValidEditedContent = editedContent.length > 0;

  return (
    <Container>
      <Name>{name}</Name>
      <Text
        contentEditable={contentEditable}
        suppressContentEditableWarning={true}
        onInput={(event: ChangeEvent<HTMLDivElement>) => {
          setEditedContent(event.target.innerText);
        }}
        data-testid="comment-text-box-contenteditable-input"
      >
        {children}
      </Text>
      {contentEditable && (
        <Button
          type="button"
          onClick={() => onSubmitEditedComment(editedContent)}
          disabled={!isValidEditedContent}
          data-testid="comment-text-box-submit-button"
        >
          등록
        </Button>
      )}
    </Container>
  );
};

export default CommentTextBox;
