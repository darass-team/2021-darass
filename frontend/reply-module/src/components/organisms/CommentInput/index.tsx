import { User } from "../../../types/user";
import SubmitButton from "../../atoms/SubmitButton";
import { Form, TextArea, Wrapper, GuestInfo } from "./styles";
import { CreateCommentRequestData } from "../../../types/comment";
import { useInput } from "../../../hooks";
import { FormEvent } from "react";

export interface Props {
  user: User | undefined;
  createComment: (data: CreateCommentRequestData) => Promise<Comment>;
  url: string | null;
  projectSecretKey: string | null;
}

const CommentInput = ({ user, createComment, url, projectSecretKey }: Props) => {
  const { value: content, onChange: onChangeContent, setValue: setContent } = useInput("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createComment({ content, url, projectSecretKey });
    setContent("");
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea value={content} onChange={onChangeContent} placeholder="댓글을 입력해주세요." />

      <Wrapper>
        {!user && (
          <div>
            <GuestInfo type="text" placeholder="이름" />
            <GuestInfo type="password" placeholder="비밀번호" />
          </div>
        )}
        <SubmitButton onClick={() => {}}>등록</SubmitButton>
      </Wrapper>
    </Form>
  );
};

export default CommentInput;
