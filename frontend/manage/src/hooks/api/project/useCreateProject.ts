import { QUERY } from "@/constants/api";
import { NO_ACCESS_TOKEN } from "@/constants/errorName";
import { CreateProjectRequest, Project } from "@/types/project";
import { AlertError } from "@/utils/alertError";
import { request } from "@/utils/request";
import axios from "axios";
import { useHistory } from "react-router";
import { useMutation } from "simple-react-query";

const _createProject = async ({ name, description }: CreateProjectRequest) => {
  try {
    const response = await request.post(QUERY.PROJECT, { name, description });

    return response.data as Project["id"];
  } catch (error) {
    console.error(error);

    if (!axios.isAxiosError(error)) {
      throw new Error("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 801 || error.response?.data.code === 806) {
      const newError = new AlertError("로그인이 필요합니다.");
      newError.name = NO_ACCESS_TOKEN;

      throw newError;
    }

    if (error.response?.data.code === 702) {
      throw new AlertError("중복된 프로젝트명입니다.");
    }

    throw new AlertError("프로젝트 생성에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useCreateProject = () => {
  const history = useHistory();
  const { isLoading, isError, error, data, mutation } = useMutation<CreateProjectRequest, Project>({
    query: (_data: CreateProjectRequest) => _createProject(_data),
    onSuccess: (projectResult: Project) => {
      if (!projectResult) return;

      alert("프로젝트 생성에 성공하셨습니다.");
      history.push(`/projects/${projectResult.id}/guide`);
    }
  });

  return { createProject: mutation, isLoading, error, data };
};
