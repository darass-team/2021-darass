import { useContext } from "react";
import { QUERY } from "@/constants";
import { NO_ACCESS_TOKEN } from "@/constants/errorName";
import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { EditProjectRequest, Project } from "@/types/project";
import { AlertError } from "@/utils/error";
import { request } from "@/utils/request";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { userContext } from "@/contexts/UserProvider";

const _editProject = async ({ id, name, description }: EditProjectRequest) => {
  try {
    const response = await request.patch(`${QUERY.PROJECT}/${id}`, {
      name,
      description
    });

    return response.data;
  } catch (error) {
    console.error(error);

    if (!axios.isAxiosError(error)) {
      throw new Error("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 700) {
      throw new AlertError("존재하지 않는 프로젝트입니다.");
    }

    if (error.response?.data.code === 801 || error.response?.data.code === 806) {
      const newError = new AlertError("로그인이 필요합니다.");
      newError.name = NO_ACCESS_TOKEN;

      throw newError;
    }

    throw new AlertError("프로젝트 수정에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useEditProject = () => {
  const queryClient = useQueryClient();
  const { refreshAccessToken } = useContext(userContext);

  const editMutation = useMutation<void, Error, EditProjectRequest>(data => _editProject(data), {
    onSuccess: (_, editedProject) => {
      queryClient.setQueryData<Project[] | undefined>(REACT_QUERY_KEY.PROJECTS, projects => {
        return projects?.map(project => {
          if (project.id === editedProject.id) {
            return { ...project, name: editedProject.name, description: editedProject.description };
          }

          return project;
        });
      });
    }
  });

  const isLoading = editMutation.isLoading;
  const error = editMutation.error;

  const editProject = async (data: EditProjectRequest) => {
    try {
      return await editMutation.mutateAsync(data);
    } catch (error) {
      if ((error as Error)?.name === NO_ACCESS_TOKEN) {
        return await refetch(data);
      } else {
        throw error;
      }
    }
  };

  const refetch = async (data: EditProjectRequest) => {
    try {
      await refreshAccessToken();

      return await editMutation.mutateAsync(data);
    } catch (error) {
      if ((error as Error)?.name === NO_ACCESS_TOKEN) {
        return null;
      }

      throw error;
    }
  };

  return { editProject, isLoading, error };
};
