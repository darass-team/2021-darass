import { Comment } from "../../types";

export const getTotalCommentsCount = (comments: Comment[]) => {
  return (
    comments.length +
    comments.reduce((totalSubCommentsCount, comment) => totalSubCommentsCount + comment.subComments.length, 0)
  );
};
