import { useLocation } from "react-router";
import { QUERY } from "../../../constants";
import { request } from "../../../utils/request";

const OAuth = () => {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const code = urlSearchParams.get("code");
  const oauthProviderName = location.pathname; // => /auth/github

  console.log(oauthProviderName);

  if (code) {
    (async () => {
      try {
        const response = await request.post(QUERY.LOGIN, {
          oauthProviderName,
          authorizationCode: code
        });

        const accessToken = response.data.accessToken;
        console.log(accessToken);

        // Context API 저장
      } catch (error) {
        console.error("실패", error);
      }
    })();
  }

  return null;
};

export default OAuth;
