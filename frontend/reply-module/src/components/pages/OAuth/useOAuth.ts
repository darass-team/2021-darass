import { useEffect } from "react";
import { useToken } from "@/hooks/api/token/useToken";
import { useParams, useLocation } from "react-router";
import { request } from "@/utils/request";
import { QUERY } from "@/constants/api";

export const useOAuth = () => {
  const location = useLocation();
  const { provider } = useParams<{ provider: string }>();
  const urlSearchParams = new URLSearchParams(location.search);
  const code = urlSearchParams.get("code");
  const { refetchAccessToken, accessToken } = useToken();

  useEffect(() => {
    if (!code) return;

    const setAccessTokenAsync = async () => {
      try {
        await request.post(QUERY.LOGIN, {
          oauthProviderName: provider,
          authorizationCode: code
        });

        refetchAccessToken();
      } catch (error) {
        console.error(error);
      }
    };

    setAccessTokenAsync();
  }, [code]);

  useEffect(() => {
    if (accessToken) {
      window.close();
    }
  }, [accessToken]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      alert("로그인에 실패하였습니다. 잠시후 다시 시도해주세요.");
      window.close();
    }, 5000);

    return () => clearTimeout(timeId);
  }, []);
};
