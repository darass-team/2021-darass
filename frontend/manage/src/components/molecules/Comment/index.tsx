import moment from "moment";
import { Comment as CommentType } from "@/types/comment";
import { User } from "@/types/user";
import Avatar from "@/components/atoms/Avatar";
import CheckBox from "@/components/atoms/CheckBox";
import { Content, ContentMeta, ContentWrapper, Name, Url, SecretIcon } from "./styles";

export interface Props {
  isMyComment: boolean;
  isChecked: boolean;
  onChangeCheckBox: () => void;
  authorProfileImageUrl: User["profileImageUrl"];
  authorNickName: User["nickName"];
  createdDate: CommentType["createdDate"];
  content: CommentType["content"];
  url: CommentType["url"];
  secret: CommentType["secret"];
}

const Comment = ({
  isMyComment,
  isChecked,
  onChangeCheckBox,
  authorProfileImageUrl,
  authorNickName,
  createdDate,
  content,
  url,
  secret
}: Props) => {
  return (
    <>
      <CheckBox isChecked={isChecked} onChange={onChangeCheckBox} />
      <Avatar imageURL={authorProfileImageUrl} />
      <ContentWrapper>
        <ContentMeta>
          <Name isMyComment={isMyComment}>{authorNickName}</Name>
          <time>{moment(createdDate).format("YYYY-MM-DD")}</time>
          {secret && <SecretIcon>{"🔒"}</SecretIcon>}
        </ContentMeta>
        <Content dangerouslySetInnerHTML={{ __html: content }}></Content>
        <Url href={url} target="_blank" rel="noopener noreferrer nofollow">
          {url}
        </Url>
      </ContentWrapper>
    </>
  );
};

export default Comment;
