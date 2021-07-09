import SubmitButton from "../../atoms/SubmitButton";
import { Container, TextArea, Wrapper, GuestInfo } from "./styles";

export interface Props {}

const CommentInput = () => {
  const isGuest = true;

  return (
    <Container>
      <TextArea placeholder="댓글을 입력해주세요." />

      <Wrapper>
        {isGuest && (
          <div>
            <GuestInfo type="text" placeholder="이름" />
            <GuestInfo type="password" placeholder="비밀번호" />
          </div>
        )}

        <SubmitButton onClick={() => {}}>등록</SubmitButton>
      </Wrapper>
    </Container>
  );
};

export default CommentInput;
