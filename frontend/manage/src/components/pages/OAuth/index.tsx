import { useLocation } from "react-router";
import { QUERY } from "../../../constants";
import { request } from "../../../utils/request";

const OAuth = () => {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const code = urlSearchParams.get("code");

  if (code) {
    (async () => {
      const res = await request.post(QUERY.LOGIN, {
        oauthProviderName: "GITHUB",
        authorizationCode: code
      });

      console.log(res);
      alert(res);
    })();
  }

  return null;
};

export default OAuth;
