import Comment from "@/components/@organisms/Comment";
import { ORDER_BUTTON } from "@/constants/orderButton";
import { Comment as CommentType } from "@/types/comment";
import { User } from "@/types/user";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import {
  CommentContainer,
  CommentCount,
  CommentCountWrapper,
  Container,
  Header,
  Notice,
  OrderButton,
  OrderButtonContainer,
  OrderButtonWrapper
} from "./styles";

export interface Props {
  user?: User;
  projectOwnerId?: User["id"];
  totalCommentsCount: number;
  comments: CommentType[];
  sortOption: keyof typeof ORDER_BUTTON;
  notice: string;
  isVisible: boolean;
  onSelectSortOption: (value: keyof typeof ORDER_BUTTON) => void;
}

const CommentList = ({
  user,
  projectOwnerId,
  totalCommentsCount,
  comments,
  sortOption,
  notice,
  isVisible,
  onSelectSortOption,
  ...props
}: Props) => {
  const {
    uiInfo: { isShowSortOption }
  } = useContext(ThemeContext);

  return (
    <Container isVisible={isVisible} {...props}>
      <Header>
        <CommentCountWrapper>
          <span>댓글</span>
          <CommentCount>{totalCommentsCount || 0}</CommentCount>
        </CommentCountWrapper>
        <OrderButtonContainer>
          {isShowSortOption && (
            <OrderButtonWrapper>
              {Object.entries(ORDER_BUTTON).map(([key, value]) => (
                <OrderButton
                  type="button"
                  key={key}
                  isSelected={sortOption === key}
                  onClick={() => {
                    onSelectSortOption(key as keyof typeof ORDER_BUTTON);
                  }}
                  data-testid={`comment-list-order-button-${key}`}
                >
                  {value}
                </OrderButton>
              ))}
            </OrderButtonWrapper>
          )}
        </OrderButtonContainer>
      </Header>
      <CommentContainer>
        {notice && <Notice>{notice}</Notice>}

        {comments.map(comment => {
          const authorId = comment.user.id;

          const iAmGuestUser = !user;
          const iAmAdmin = projectOwnerId !== undefined && projectOwnerId === user?.id;

          const thisCommentIsMine = authorId !== undefined && authorId === user?.id;
          const thisCommentIsWrittenByAdmin = comment.user.id === projectOwnerId;
          const thisCommentIsWrittenByGuest = comment.user.type === "GuestUser";
          const isVisibleCommentOption = true;
          const isAllowToControl = iAmAdmin || thisCommentIsMine || (iAmGuestUser && thisCommentIsWrittenByGuest);

          const hasLikingUser = comment.likingUsers.length > 0;
          const hasSubComments = comment?.subComments ? comment.subComments.length > 0 : false;
          const alreadyLiked = comment.likingUsers.some(likingUser => likingUser.id === user?.id);

          const isReadable = comment.readable || thisCommentIsMine;
          const canIEdit = thisCommentIsMine || (iAmGuestUser && thisCommentIsWrittenByGuest && isReadable);
          const canIDelete = canIEdit || iAmAdmin;

          return (
            <Comment
              key={comment.id + `${isReadable}` + comment.content}
              user={user}
              projectOwnerId={projectOwnerId}
              comment={comment}
              isVisibleCommentOption={isVisibleCommentOption}
              isAllowToControl={isAllowToControl}
              iAmAdmin={iAmAdmin}
              iAmGuestUser={iAmGuestUser}
              thisCommentIsWrittenByAdmin={thisCommentIsWrittenByAdmin}
              thisCommentIsWrittenByGuest={thisCommentIsWrittenByGuest}
              thisCommentIsMine={thisCommentIsMine}
              isSubComment={false}
              isReadable={isReadable}
              alreadyLiked={alreadyLiked}
              hasSubComments={hasSubComments}
              hasLikingUser={hasLikingUser}
              canIEdit={canIEdit}
              canIDelete={canIDelete}
            />
          );
        })}
      </CommentContainer>
    </Container>
  );
};

export default CommentList;
