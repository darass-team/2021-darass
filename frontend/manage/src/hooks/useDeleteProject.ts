import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../constants";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { Project } from "../types/project";
import { AlertError } from "../utils/error";
import { request } from "../utils/request";

const _deleteProject = async (id: Project["id"]) => {
  try {
    await request.delete(`${QUERY.PROJECT}/${id}`);
  } catch (error) {
    console.error(error);

    if (!axios.isAxiosError(error)) {
      throw new Error("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 700) {
      throw new AlertError("존재하지 않는 프로젝트입니다.");
    }

    throw new AlertError("프로젝트 삭제에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<void, Error, Project["id"]>(id => _deleteProject(id), {
    onSuccess: (_, id) => {
      queryClient.setQueryData<Project[] | undefined>(REACT_QUERY_KEY.PROJECTS, projects => {
        return projects?.filter(project => project.id !== id);
      });
    }
  });

  const isLoading = deleteMutation.isLoading;
  const error = deleteMutation.error;

  const deleteProject = async (id: Project["id"]) => {
    return await deleteMutation.mutateAsync(id);
  };

  return { deleteProject, isLoading, error };
};
