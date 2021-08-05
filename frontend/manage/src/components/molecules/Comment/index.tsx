import { Comment as CommentType } from "../../../types/comment";
import { User } from "../../../types/user";
import CheckBox from "../../atoms/CheckBox";
import { Avatar, Content, ContentMeta, ContentWrapper, Date, Name, Url } from "./styles";

export interface Props {
  isChecked: boolean;
  onChangeCheckBox: () => void;
  authorProfileImageUrl: User["profileImageUrl"];
  authorNickName: User["nickName"];
  createdDate: CommentType["createdDate"];
  content: CommentType["content"];
}

const Comment = ({
  isChecked,
  onChangeCheckBox,
  authorProfileImageUrl,
  authorNickName,
  createdDate,
  content
}: Props) => {
  return (
    <>
      <CheckBox isChecked={isChecked} onChange={onChangeCheckBox} />
      <Avatar imageURL={authorProfileImageUrl} />
      <ContentWrapper>
        <ContentMeta>
          <Name>{authorNickName}</Name>
          <Date>{createdDate}</Date>
        </ContentMeta>
        <Content>{content}</Content>
        <Url>www.naver.com</Url>
      </ContentWrapper>
    </>
  );
};

export default Comment;
