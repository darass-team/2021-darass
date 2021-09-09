import { useContext, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { QUERY } from "../../../constants/api";
import { accessTokenContext } from "../../../contexts/AccessTokenProvider";
import { useUser } from "../../../hooks";
import { request } from "../../../utils/request";

const OAuth = () => {
  const location = useLocation();
  const history = useHistory();
  const { user, login } = useUser();
  const { provider } = useParams<{ provider: string }>();
  const urlSearchParams = new URLSearchParams(location.search);
  const code = urlSearchParams.get("code");
  const { accessToken, setAccessToken } = useContext(accessTokenContext);

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

  useEffect(() => {
    login();
  }, [accessToken]);

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user]);

  return <>로딩중입니다.</>;
};

export default OAuth;
