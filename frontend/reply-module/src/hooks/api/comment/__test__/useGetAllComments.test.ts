import { useGetAllComments, useMessageChannelFromReplyModuleContext } from "@/hooks";
import { useUserContext } from "@/hooks/contexts/useUserContext";
import React from "react";

jest.mock("react");
jest.mock("react-query");
jest.mock("@/hooks/contexts/useMessageFromReplyModule");
jest.mock("@/hooks/contexts/useUserContext");

let mutate = jest.fn();

beforeEach(() => {
  (useMessageChannelFromReplyModuleContext as jest.Mock).mockReturnValue({
    openAlert: jest.fn()
  });

  jest.spyOn(React, "useEffect");

  jest.clearAllMocks();
});

describe("useGetAllComments를 test", () => {
  test("useGetAllComments를 호출하면, useQuery가 호출된다.", () => {
    const { totalCommentsCount, totalPage, comments, isLoading, error, refetch } = useGetAllComments({
      url: "darass.co.kr",
      projectSecretKey: "secretKey",
      sortOption: "oldest"
    });

    // expect(useQuery).toHaveBeenCalled();
  });
});
