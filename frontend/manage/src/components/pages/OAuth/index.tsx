import { QUERY, ROUTE } from "@/constants";
import { accessTokenContext } from "@/contexts/AccessTokenProvider";
import { useUser } from "@/hooks";
import { request } from "@/utils/request";
import { useContext, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import LoadingPage from "../LoadingPage";

const OAuth = () => {
  const history = useHistory();
  const location = useLocation();
  const { provider } = useParams<{ provider: string }>();
  const urlSearchParams = new URLSearchParams(location.search);
  const code = urlSearchParams.get("code");
  const { setAccessToken } = useContext(accessTokenContext);

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
