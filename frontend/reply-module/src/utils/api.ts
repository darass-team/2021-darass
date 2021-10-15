import { QUERY } from "@/constants/api";
import { NO_ACCESS_TOKEN } from "@/constants/errorName";
import {
  CreateCommentRequestData,
  DeleteCommentRequestParameter,
  EditCommentParameter,
  EditCommentRequestData,
  GetCommentsRequestParams,
  GuestUserConfirmInfo
} from "@/types/comment";
import { Project } from "@/types/project";
import { Comment } from "@/types/comment";
import axios from "axios";
import { AlertError } from "./alertError";
import convertDateFormat from "./convertDateFormat";
import { axiosBearerOption } from "./customAxios";
import { request } from "./request";
import { User } from "@/types/user";

export const getAccessTokenByRefreshToken = async () => {
  try {
    const response = await request.post(QUERY.LOGIN_REFRESH, {});
    const { accessToken } = response.data;
    axiosBearerOption.clear();
    axiosBearerOption.setAccessToken(accessToken);

    return accessToken;
  } catch (error) {
    axiosBearerOption.clear();
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    throw new Error("액세스 토큰 재발급에 실패하셨습니다.");
  }
};

export const deleteRefreshToken = async () => {
  try {
    const response = await request.delete(QUERY.LOGOUT);

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    throw new AlertError("로그아웃에 실패하였습니다.");
  }
};

export const patchEditUser = async (data: FormData) => {
  const headers = {
    "Content-Type": "multipart/form-data"
  };

  try {
    const response = await request.patch(QUERY.USER, data, headers);

    return response.data;
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

    throw new AlertError("유저정보 수정에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const getProjectOwnerId = async (projectSecretKey: Project["secretKey"]) => {
  try {
    const response = await request.get(`${QUERY.PROJECT}/user-id?secretKey=${projectSecretKey}`);
    const project: Project = response.data;

    return project.userId;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 806 || error.response?.data.code === 801) {
      const newError = new Error("액세스 토큰이 존재하지 않습니다.");
      newError.name = NO_ACCESS_TOKEN;

      throw newError;
    }

    if (error.response?.data.code === 700) {
      throw new AlertError("존재하지 않는 프로젝트입니다.");
    }

    throw new AlertError("프로젝트 조회에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const getUser = async () => {
  try {
    const response = await request.get(QUERY.USER, { withCredentials: true });

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 806 || error.response?.data.code === 801) {
      const newError = new Error("액세스 토큰이 존재하지 않습니다.");
      newError.name = NO_ACCESS_TOKEN;

      throw newError;
    }

    throw new AlertError("유저정보 조회에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const getConfirmGuestPassword = async ({ guestUserId, guestUserPassword }: GuestUserConfirmInfo) => {
  try {
    const response = await request.get(QUERY.CHECK_GUEST_PASSWORD({ guestUserId, guestUserPassword }));
    const isCorrectPassword = response.data.isCorrectPassword;

    return isCorrectPassword;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new Error("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 600) {
      throw new AlertError("해당 유저가 존재하지 않습니다.");
    }
  }
};

export const postCreateComment = async (_data: CreateCommentRequestData) => {
  try {
    const response = await request.post(QUERY.COMMENT, _data);

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 700) {
      throw new AlertError("관리자가 프로젝트를 삭제하여 더 이상 댓글을 작성할 수 없습니다.");
    }

    if (error.response?.data.code === 900) {
      throw new AlertError("해당 댓글이 삭제되어 답글을 작성할 수 없습니다.");
    }

    throw new AlertError("댓글 생성에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const deleteComment = async ({ id, guestUserId, guestUserPassword }: DeleteCommentRequestParameter) => {
  try {
    const response = await request.delete(
      `${QUERY.COMMENT}/${id}/?guestUserId=${guestUserId}&guestUserPassword=${guestUserPassword}`
    );

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 900) {
      throw new AlertError("이미 삭제된 댓글입니다.");
    }

    if (error.response?.data.code === 903) {
      throw new AlertError("해당 댓글을 삭제할 권한이 없습니다.");
    }

    throw new AlertError("댓글 삭제에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const editComment = async (editedComment: EditCommentParameter) => {
  try {
    const response = await request.patch<EditCommentRequestData>(`${QUERY.COMMENT}/${editedComment.id}`, {
      content: editedComment.content,
      guestUserId: editedComment.guestUserId,
      guestUserPassword: editedComment.guestUserPassword,
      secret: editedComment.secret
    });

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 900) {
      throw new AlertError("이미 삭제된 댓글입니다.");
    }

    if (error.response?.data.code === 903) {
      throw new AlertError("해당 댓글을 수정할 권한이 없습니다.");
    }

    throw new AlertError("댓글을 수정하는데 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const getAlarms = async () => {
  const RANGE_TO_RECENTLY_ALARM = 30;

  try {
    const date = new Date();
    const today = convertDateFormat(date);
    date.setDate(-RANGE_TO_RECENTLY_ALARM);
    const before30Days = convertDateFormat(date);

    const response = await request.get(`${QUERY.ALARM}?startDate=${before30Days}&endDate=${today}`, {
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    throw new Error("최근 알림을 불러오는데 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const getAllComments = async ({ url, projectSecretKey, sortOption }: GetCommentsRequestParams) => {
  if (!url || !projectSecretKey) return undefined;

  try {
    const response = await request.get(QUERY.GET_ALL_COMMENTS({ url, projectSecretKey, sortOption }));

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    throw new Error("댓글을 불러오는데 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const likeComment = async (id: Comment["id"]) => {
  try {
    const response = await request.post(QUERY.LIKE_COMMENT(id), {});

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 800 || error.response?.data.code === 806) {
      throw new AlertError("'좋아요'를 누르려면 로그인을 해주세요.");
    }

    if (error.response?.data.code === 900) {
      throw new AlertError("이미 삭제된 댓글입니다.");
    }

    throw new AlertError("잠시 후 다시 시도해주세요.");
  }
};

export const getSecretComment = async ({
  commentId,
  guestUserId,
  guestUserPassword
}: {
  commentId: Comment["id"];
  guestUserId: User["id"];
  guestUserPassword: string;
}) => {
  try {
    const response = await request.get(QUERY.GET_SECRET_COMMENT({ commentId, guestUserId, guestUserPassword }));

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    throw new AlertError(error.message);
  }
};
