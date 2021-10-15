import { EditCommentParameter } from "@/types/comment";
import { CreateCommentRequestData, GetCommentsRequestParams } from "@/types/comment";
import { QUERY } from "@/constants/api";
import { comments } from "@/__test__/fixture/comments";
import { socialLoginUser } from "@/__test__/fixture/user";
import {
  deleteComment,
  deleteRefreshToken,
  editComment,
  getAccessTokenByRefreshToken,
  getAlarms,
  getAllComments,
  getConfirmGuestPassword,
  likeComment,
  getProjectOwnerId,
  getUser,
  patchEditUser,
  postCreateComment
} from "../api";
import { customAxios, axiosBearerOption } from "../customAxios";
import { request } from "../request";
import { alarmContents } from "@/__test__/fixture/alarmContent";

jest.mock("../request");
jest.mock("../customAxios");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("api test", () => {
  describe("getAccessTokenByRefreshToken", () => {
    test("when post success, return accessToken", async () => {
      (request.post as jest.Mock).mockImplementationOnce(() => {
        return {
          data: {
            accessToken: "atk"
          }
        };
      });

      const res = await getAccessTokenByRefreshToken();

      expect(request.post).toHaveBeenCalled();
      expect(request.post).toHaveBeenCalledWith(QUERY.LOGIN_REFRESH, {});
      expect(res).toEqual("atk");
    });
  });

  describe("deleteRefreshToken", () => {
    test("when delete success, return accessToken", async () => {
      (request.delete as jest.Mock).mockImplementationOnce(() => {
        return {
          data: true
        };
      });

      await deleteRefreshToken();

      expect(request.delete).toHaveBeenCalled();
      expect(request.delete).toHaveBeenCalledWith(QUERY.LOGOUT);
    });
  });

  describe("patchEditUser", () => {
    test("when edit success, return new user", async () => {
      (request.patch as jest.Mock).mockImplementationOnce(() => {
        return {
          data: {
            user: socialLoginUser
          }
        };
      });

      const headers = {
        "Content-Type": "multipart/form-data"
      };

      const data = new FormData();

      const res = await patchEditUser(data);

      expect(request.patch).toHaveBeenCalled();
      expect(request.patch).toHaveBeenCalledWith(QUERY.USER, data, headers);
    });
  });

  describe("getProjectOwnerId", () => {
    test("when get success, return userId", async () => {
      (request.get as jest.Mock).mockImplementationOnce(() => {
        return {
          data: {
            userId: socialLoginUser.id
          }
        };
      });

      const projectSecretKey = "secretKey";
      const res = await getProjectOwnerId(projectSecretKey);

      expect(request.get).toHaveBeenCalled();
      expect(request.get).toHaveBeenCalledWith(`${QUERY.PROJECT}/user-id?secretKey=${projectSecretKey}`);
      expect(res).toEqual(socialLoginUser.id);
    });
  });

  describe("getUser", () => {
    test("when test success, return user", async () => {
      (request.get as jest.Mock).mockImplementationOnce(() => {
        return {
          data: socialLoginUser
        };
      });

      const res = await getUser();

      expect(request.get).toHaveBeenCalled();
      expect(request.get).toHaveBeenCalledWith(QUERY.USER, { withCredentials: true });
      expect(res).toEqual(socialLoginUser);
    });
  });
  describe("getConfirmGuestPassword", () => {
    test("when test success, return boolean result", async () => {
      (request.get as jest.Mock).mockImplementationOnce(() => {
        return {
          data: {
            isCorrectPassword: true
          }
        };
      });

      const guestUserId = 10;
      const guestUserPassword = "123";

      const res = await getConfirmGuestPassword({
        guestUserId,
        guestUserPassword
      });

      expect(request.get).toHaveBeenCalled();
      expect(request.get).toHaveBeenCalledWith(QUERY.CHECK_GUEST_PASSWORD({ guestUserId, guestUserPassword }));
      expect(res).toEqual(true);
    });
  });
  describe("postCreateComment", () => {
    test("when test success, return comment", async () => {
      (request.post as jest.Mock).mockImplementationOnce(() => {
        return {
          data: comments[0]
        };
      });

      const data: CreateCommentRequestData = {
        content: "",
        parentId: 1,
        url: "darass.co.kr",
        projectSecretKey: "secretKey",
        guestNickName: "nickname",
        guestUserPassword: "123",
        secret: true
      };
      const res = await postCreateComment(data);

      expect(request.post).toHaveBeenCalled();
      expect(request.post).toHaveBeenCalledWith(QUERY.COMMENT, data);
      expect(res).toEqual(comments[0]);
    });
  });
  describe("deleteComment", () => {
    test("when test success, return boolean result", async () => {
      (request.delete as jest.Mock).mockImplementationOnce(() => {
        return {
          data: true
        };
      });

      const id = 1;
      const guestUserId = 1;
      const guestUserPassword = "123";

      const res = await deleteComment({ id, guestUserId, guestUserPassword });

      expect(request.delete).toHaveBeenCalled();
      expect(request.delete).toHaveBeenCalledWith(
        `${QUERY.COMMENT}/${id}/?guestUserId=${guestUserId}&guestUserPassword=${guestUserPassword}`
      );
      expect(res).toEqual(true);
    });
  });
  describe("editComment", () => {
    test("when test success, return comment", async () => {
      (request.patch as jest.Mock).mockImplementationOnce(() => {
        return {
          data: comments[0]
        };
      });

      const data: EditCommentParameter = {
        id: 1,
        content: "",
        guestUserId: 2,
        guestUserPassword: "123",
        secret: false
      };

      const res = await editComment(data);

      expect(request.patch).toHaveBeenCalled();
      expect(request.patch).toHaveBeenCalledWith(`${QUERY.COMMENT}/${data.id}`, {
        content: data.content,
        guestUserId: data.guestUserId,
        guestUserPassword: data.guestUserPassword,
        secret: false
      });
      expect(res).toEqual(comments[0]);
    });
  });
  describe("getAlarms", () => {
    test("when test success, return alarms", async () => {
      (request.get as jest.Mock).mockImplementationOnce(() => {
        return {
          data: alarmContents
        };
      });

      const res = await getAlarms();

      expect(request.get).toHaveBeenCalled();
      expect(res).toEqual(alarmContents);
    });
  });
  describe("getAllComments", () => {
    test("when test success, return all comments", async () => {
      (request.get as jest.Mock).mockImplementationOnce(() => {
        return {
          data: comments
        };
      });

      const data: GetCommentsRequestParams = {
        url: "darass.co.kr",
        projectSecretKey: "asd",
        sortOption: "latest"
      };

      const res = await getAllComments(data);

      expect(request.get).toHaveBeenCalled();
      expect(request.get).toHaveBeenCalledWith(QUERY.GET_ALL_COMMENTS(data));
      expect(res).toEqual(comments);
    });
  });
  describe("likeComment", () => {
    test("when test success, return comment", async () => {
      (request.post as jest.Mock).mockImplementationOnce(() => {
        return {
          data: comments
        };
      });

      const id = 1;
      const res = await likeComment(id);

      expect(request.post).toHaveBeenCalled();
      expect(request.post).toHaveBeenCalledWith(QUERY.LIKE_COMMENT(id), {});
      expect(res).toEqual(comments);
    });
  });
});
