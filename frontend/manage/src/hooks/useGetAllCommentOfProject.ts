import { Comment } from "../types/comment";
import { comments as _comments } from "../__test__/fixture/comments";

interface Props {
  projectId: number;
}

export const useGetAllCommentOfProject = ({ projectId }: Props) => {
  const comments: Comment[] = JSON.parse(JSON.stringify(_comments));

  return { comments };
};
