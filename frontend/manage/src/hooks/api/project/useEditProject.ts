import { QUERY } from "@/constants";
import { NO_ACCESS_TOKEN } from "@/constants/errorName";
import { EditProjectRequest } from "@/types/project";
import { AlertError } from "@/utils/alertError";
import { request } from "@/utils/request";
import axios from "axios";
import { useMutation } from "simple-react-query";

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
  const { isLoading, isError, error, data, mutation } = useMutation<EditProjectRequest, void>({
    query: (data: EditProjectRequest) => _editProject(data)
  });

  return { editProject: mutation, isLoading, error };
};
