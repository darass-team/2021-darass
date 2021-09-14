import { QUERY } from "@/constants";
import { userContext } from "@/contexts/UserProvider";
import { request } from "@/utils/request";
import { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import LoadingPage from "../LoadingPage";

const OAuth = () => {
  const location = useLocation();
  const { provider } = useParams<{ provider: string }>();
  const urlSearchParams = new URLSearchParams(location.search);
  const code = urlSearchParams.get("code");
  const { refreshAccessToken } = useContext(userContext);

  useEffect(() => {
    if (!code) return;

    const setAccessTokenAsync = async () => {
      try {
        await request.post(QUERY.LOGIN, {
          oauthProviderName: provider,
          authorizationCode: code
        });

        refreshAccessToken();
      } catch (error) {
        console.error(error);
      }
    };

    setAccessTokenAsync();
  }, [code]);

  return <LoadingPage />;
};

export default OAuth;
