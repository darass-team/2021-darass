import { comments } from "@/__test__/fixture/comments";
import { socialLoginUser } from "@/__test__/fixture/user";

export const useComment = jest.fn().mockImplementation(() => {
  return {
    user: socialLoginUser,
    projectOwnerId: 1,
    comment: comments[0],
    isVisibleCommentOption: false,
    iAmAdmin: false,
    iAmGuestUser: false,
    thisCommentIsWrittenByAdmin: false,
    thisCommentIsWrittenByGuest: false,
    thisCommentIsMine: false,
    isSubComment: false,
    alreadyLiked: false,
    hasSubComments: false,
    hasLikingUser: false,
    canIEdit: false,
    canIDelete: false
  };
});
