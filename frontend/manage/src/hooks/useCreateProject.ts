import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { REACT_QUERY_KEY } from "../constants";
import { QUERY } from "../constants/api";
import { CreateProjectRequest, Project } from "../types/project";
import { AlertError } from "../utils/error";
import { request } from "../utils/request";

const _createProject = async ({ name, description }: CreateProjectRequest) => {
  try {
    const response = await request.post(QUERY.PROJECT, { name, description });

    return response.data;
  } catch (error) {
    console.error(error);

    if (!axios.isAxiosError(error)) {
      throw new Error("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 801) {
      throw new AlertError("로그인이 필요합니다.");
    }

    if (error.response?.data.code === 702) {
      throw new AlertError("중복된 프로젝트 명입니다.");
    }

    throw new AlertError("프로젝트 생성에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<Project, Error, CreateProjectRequest>(data => _createProject(data), {
    onSuccess: data => {
      queryClient.setQueryData<Project[] | undefined>(REACT_QUERY_KEY.PROJECT, projects => {
        return projects?.concat(data);
      });
    }
  });

  const isLoading = createMutation.isLoading;
  const error = createMutation.error;

  const createProject = async (data: CreateProjectRequest) => {
    const project = await createMutation.mutateAsync(data);

    return project;
  };

  return { createProject, isLoading, error };
};
