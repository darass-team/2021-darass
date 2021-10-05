import { OAUTH_URL } from "@/constants/oauth";
import { ORDER_BUTTON } from "@/constants/orderButton";
import { useGetAllComments, useGetProjectOwnerId, useMessageChannelFromReplyModuleContext, useUser } from "@/hooks";
import { useToken } from "@/hooks/api/token/useToken";
import { AlertError } from "@/utils/alertError";
import { popUpCenter } from "@/utils/popUpCenter";
import { useEffect, useState } from "react";

export const useCommentArea = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const url = urlParams.get("url");
  const projectSecretKey = urlParams.get("projectKey");

  const [sortOption, setSortOption] = useState<keyof typeof ORDER_BUTTON>("oldest");
  const [notice, setNotice] = useState("");

  const { refetchAccessToken } = useToken();
  const { user, logout } = useUser();
  const {
    totalCommentsCount,
    comments,
    refetch: refetchAllComments,
    isLoading: commentsLoading,
    error: commentsError
  } = useGetAllComments({ url, projectSecretKey, sortOption });
  const {
    projectOwnerId,
    isLoading: getProjectOwnerIdLoading,
    error: getProjectOwnerError
  } = useGetProjectOwnerId(projectSecretKey || "");
  const { setScrollHeight } = useMessageChannelFromReplyModuleContext();

  useEffect(() => {
    setScrollHeight();
  }, [comments]);

  useEffect(() => {
    refetchAllComments();
  }, [sortOption]);

  useEffect(() => {
    if (getProjectOwnerIdLoading || commentsLoading) return;

    if (!url) {
      setNotice("URL을 확인해주세요.");
      return;
    }
    if (!projectSecretKey) {
      setNotice("project secret key를 확인해주세요.");
      return;
    }
    if (getProjectOwnerError) {
      setNotice(getProjectOwnerError.message);
      return;
    }
    if (commentsError) {
      setNotice(commentsError.message);
      return;
    }

    if (!(getProjectOwnerError || commentsError)) {
      if (totalCommentsCount === 0) {
        setNotice("작성된 댓글이 없습니다.");
        return;
      }

      setNotice("");
    }
  }, [getProjectOwnerIdLoading, commentsLoading, getProjectOwnerError, commentsError, totalCommentsCount]);

  const onLogin = async (provider: keyof typeof OAUTH_URL) => {
    try {
      const popUp = popUpCenter(OAUTH_URL[provider], "Authentication", 600, 900, "modal=yes,alwaysRaised=yes");

      const timerId = setInterval(() => {
        if (!popUp || !popUp.closed) return;

        clearInterval(timerId);
        refetchAccessToken();
      }, 300);
    } catch (error) {
      if (error instanceof AlertError) {
        alert(error.message);
      }
    }
  };

  const onSelectSortOption = (sortOption: keyof typeof ORDER_BUTTON) => {
    setSortOption(sortOption);
  };

  return {
    projectOwnerId,
    getProjectOwnerIdLoading,
    commentsLoading,
    user,
    totalCommentsCount,
    comments,
    sortOption,
    onSelectSortOption,
    notice,
    logout,
    onLogin
  };
};
