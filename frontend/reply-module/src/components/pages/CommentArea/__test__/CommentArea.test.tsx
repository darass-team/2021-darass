import { OAUTH_URL } from "@/constants/oauth";
import { PALETTE } from "@/constants/styles/palette";
import { useGetAllComments, useGetProjectOwnerId, useUser } from "@/hooks";
import { popUpCenter } from "@/utils/popUpCenter";
import { fireEvent, render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import CommentArea from "..";

jest.mock("@/utils/popUpCenter");
jest.mock("@/hooks/api/user/useGetProjectOwnerId");
jest.mock("@/hooks/api/comment/useGetAllComments");
jest.mock("@/hooks/api/user/useUser");
jest.mock("@/hooks/contexts/useMessageFromReplyModule");
jest.mock("@/hooks/contexts/useMessageFromReplyModule");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("CommentArea test", () => {
  test("projectOwnerId && !getProjectOwnerIdLoading && !commentsLoading 가 true이면 CommentList가 렌더링된다.", () => {
    (useGetProjectOwnerId as jest.Mock).mockReturnValueOnce({
      projectOwnerId: 1,
      isLoading: false,
      error: null
    });
    (useGetAllComments as jest.Mock).mockReturnValueOnce({
      totalCommentsCount: 10,
      comments: [],
      refetch: jest.fn(),
      isLoading: false,
      error: null
    });

    const { queryByTestId } = render(
      <ThemeProvider
        theme={{
          isDarkModePage: false,
          primaryColor: PALETTE.PRIMARY,
          uiInfo: { isShowSortOption: true, isAllowSocialLogin: true, isShowLogo: true }
        }}
      >
        <CommentArea isVisible={true} />
      </ThemeProvider>
    );

    expect(queryByTestId("comment-list")).toBeTruthy();
  });

  test("user가 없을때, '카카오톡 로그인 이미지'를 클릭하면 onLogin의 popUpCenter('KAKAO','Authentication', 600, 900, 'modal=yes,alwaysRaised=yes')가 실행된다.", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: undefined,
      logout: jest.fn()
    });

    const { getByAltText } = render(
      <ThemeProvider
        theme={{
          isDarkModePage: false,
          primaryColor: PALETTE.PRIMARY,
          uiInfo: { isShowSortOption: true, isAllowSocialLogin: true, isShowLogo: true }
        }}
      >
        <CommentArea isVisible={true} />
      </ThemeProvider>
    );
    fireEvent.click(getByAltText("카카오톡 로그인 이미지"));
    expect(popUpCenter).toHaveBeenCalledWith(OAUTH_URL.KAKAO, "Authentication", 600, 900, "modal=yes,alwaysRaised=yes");
  });
  test("user가 없을때, '네아버 로그인 이미지'를 클릭하면  onLogin의 popUpCenter('NAVER','Authentication', 600, 900, 'modal=yes,alwaysRaised=yes')가 실행된다.", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: undefined,
      logout: jest.fn()
    });

    const { getByAltText } = render(
      <ThemeProvider
        theme={{
          isDarkModePage: false,
          primaryColor: PALETTE.PRIMARY,
          uiInfo: { isShowSortOption: true, isAllowSocialLogin: true, isShowLogo: true }
        }}
      >
        <CommentArea isVisible={true} />
      </ThemeProvider>
    );

    fireEvent.click(getByAltText("네아버 로그인 이미지"));

    expect(popUpCenter).toHaveBeenCalledWith(OAUTH_URL.NAVER, "Authentication", 600, 900, "modal=yes,alwaysRaised=yes");
  });
});
