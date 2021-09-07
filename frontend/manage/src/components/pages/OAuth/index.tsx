import { useLocation, useParams } from "react-router";
import { QUERY } from "../../../constants";
import { request } from "../../../utils/request";

const OAuth = () => {
  const location = useLocation();
  const { provider } = useParams<{ provider: string }>();
  const urlSearchParams = new URLSearchParams(location.search);
  const code = urlSearchParams.get("code");

  if (code) {
    (async () => {
      try {
        const response = await request.post(QUERY.LOGIN, {
          oauthProviderName: provider,
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
