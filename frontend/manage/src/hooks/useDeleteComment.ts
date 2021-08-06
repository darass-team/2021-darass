import { Project } from "./../types/project";
import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../constants/api";
import { request } from "../utils/request";
import { Comment, DeleteCommentRequestParameter } from "../types/comment";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";

const _deleteComment = async ({ id }: DeleteCommentRequestParameter) => {
  try {
    const response = await request.delete(`${QUERY.COMMENT}/${id}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

interface Props {
  projectKey?: Project["secretKey"];
  page?: number;
}

export const useDeleteComment = ({ projectKey, page }: Props) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<void, Error, DeleteCommentRequestParameter>(({ id }) => _deleteComment({ id }), {
    onSuccess: () => {
      queryClient.invalidateQueries([REACT_QUERY_KEY.COMMENT_OF_PROJECT_PER_PAGE, projectKey, page]);
    }
  });

  const deleteComment = async ({ id }: DeleteCommentRequestParameter) => {
    return await deleteMutation.mutateAsync({ id });
  };

  return { deleteComment };
};
