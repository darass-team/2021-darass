import { useGetAllComments, useMessageChannelFromReplyModuleContext } from "@/hooks";
import { useUserContext } from "@/hooks/contexts/useUserContext";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

jest.mock("react");
jest.mock("react-query");
jest.mock("@/hooks/contexts/useMessageFromReplyModule");
jest.mock("@/hooks/contexts/useUserContext");

let mutate = jest.fn();

beforeEach(() => {
  (useMessageChannelFromReplyModuleContext as jest.Mock).mockReturnValue({
    openAlert: jest.fn()
  });

  (useQueryClient as jest.Mock).mockReturnValue({
    invalidateQueries: jest.fn(),
    setQueryData: jest.fn()
  });

  (useQuery as jest.Mock).mockReturnValue({
    data: true,
    isLoading: false,
    error: null,
    refetch: jest.fn()
  });

  (useMutation as jest.Mock).mockReturnValue({
    isLoading: false,
    error: null,
    mutate
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

    expect(useQuery).toHaveBeenCalled();
  });
});
