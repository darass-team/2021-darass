import { User } from "../../../types/user";
import SubmitButton from "../../atoms/SubmitButton";
import { Form, TextArea, Wrapper, GuestInfo } from "./styles";

export interface Props {
  user: User | undefined;
}

const CommentInput = ({ user }: Props) => {
  return (
    <Form>
      <TextArea placeholder="댓글을 입력해주세요." />

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