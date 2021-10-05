import { socialLoginUser } from "@/__test__/fixture/user";
export const useCommentArea = jest.fn().mockImplementation(() => {
  return {
    projectOwnerId: socialLoginUser.id,
    getProjectOwnerIdLoading: false,
    commentsLoading: false,
    user: undefined,
    totalCommentsCount: 0,
    comments: [],
    sortOption: "latest",
    onSelectSortOption: jest.fn(),
    notice: "",
    logout: jest.fn(),
    onLogin: jest.fn()
  };
});
