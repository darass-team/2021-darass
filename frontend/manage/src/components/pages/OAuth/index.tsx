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
  const { setAccessToken } = useContext(userContext);

  useEffect(() => {
    if (!code) return;

    const setAccessTokenAsync = async () => {
      try {
        const response = await request.post(QUERY.LOGIN, {
          oauthProviderName: provider,
          authorizationCode: code
        });

        const accessToken = response.data.accessToken;

        setAccessToken(accessToken);
      } catch (error) {
        setAccessToken(null);
      }
    };

    setAccessTokenAsync();
  }, [code]);

  return <LoadingPage />;
};

export default OAuth;
