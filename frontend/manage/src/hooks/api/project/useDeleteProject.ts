import { QUERY } from "@/constants";
import { NO_ACCESS_TOKEN } from "@/constants/errorName";
import { Project } from "@/types/project";
import { AlertError } from "@/utils/alertError";
import { request } from "@/utils/request";
import axios from "axios";
import { useMutation } from "simple-react-query";

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

    if (error.response?.data.code === 801 || error.response?.data.code === 806) {
      const newError = new AlertError("로그인이 필요합니다.");
      newError.name = NO_ACCESS_TOKEN;

      throw newError;
    }

    throw new AlertError("프로젝트 삭제에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useDeleteProject = () => {
  const { isLoading, isError, error, data, mutation } = useMutation<Project["id"], void>({
    query: (id: Project["id"]) => _deleteProject(id)
  });

  return { deleteProject: mutation, isLoading, error };
};
