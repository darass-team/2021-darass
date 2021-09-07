import { useContext, useEffect } from "react";
import { useQueryClient } from "react-query";
import { useLocation, useParams } from "react-router";
import { QUERY, REACT_QUERY_KEY } from "../../../constants";
import { accessTokenContext } from "../../../contexts/AccessTokenProvider";
import { useUser } from "../../../hooks";
import { request } from "../../../utils/request";

const OAuth = () => {
  const location = useLocation();
  const { login } = useUser();
  const { provider } = useParams<{ provider: string }>();
  const urlSearchParams = new URLSearchParams(location.search);
  const code = urlSearchParams.get("code");
  const { accessToken, setAccessToken } = useContext(accessTokenContext);

  useEffect(() => {
    if (!code) return;

    (async () => {
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
    })();
  }, [code]);

  useEffect(() => {
    login();
  }, [accessToken]);

  return null;
};

export default OAuth;
