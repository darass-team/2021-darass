import { QUERY, ROUTE } from "@/constants";
import { useUserContext } from "@/hooks/context/useUserContext";
import { request } from "@/utils/request";
import { useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import LoadingPage from "../LoadingPage";

const OAuth = () => {
  const location = useLocation();
  const history = useHistory();
  const { provider } = useParams<{ provider: string }>();
  const urlSearchParams = new URLSearchParams(location.search);
  const code = urlSearchParams.get("code");
  const { refetchAccessToken, accessToken } = useUserContext();

  useEffect(() => {
    if (!code) {
      history.replace(ROUTE.NON_AUTHORIZED.LOGIN);
    }

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

  return <LoadingPage />;
};

export default OAuth;
