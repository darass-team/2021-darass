import { useMessageChannelFromReplyModuleContext } from "@/hooks";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useToken } from "../useToken";

jest.mock("react-query");
jest.mock("react");
jest.mock("@/hooks/contexts/useMessageFromReplyModule");

let mutateAsync = jest.fn();

beforeEach(() => {
  (useMessageChannelFromReplyModuleContext as jest.Mock).mockReturnValue({
    openAlert: jest.fn()
  });

  (useQueryClient as jest.Mock).mockReturnValue({
    invalidateQueries: jest.fn()
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
    mutateAsync
  });

  jest.spyOn(React, "useEffect");

  jest.clearAllMocks();
});

describe("useToken test", () => {
  test("useToken를 호출하면, useQuery가 호출된다.", () => {
    const { accessToken, refetchAccessToken, removeAccessToken, error } = useToken();

    expect(useMutation).toHaveBeenCalled();
    expect(useQuery).toHaveBeenCalled();
  });
});
