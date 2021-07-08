import { useEffect } from "react";
import LoginTemplate from "../../templates/Login";

const { Kakao } = window;

const loginWithKakao = () => {
  Kakao.Auth.login({
    success: function (authObj: { access_token: string }) {
      alert(JSON.stringify(authObj.access_token));
    },
    fail: function (err: Error) {
      alert(JSON.stringify(err));
    }
  });
};

const Login = () => {
  const onLoginWithKakao = () => {
    loginWithKakao();
  };

  useEffect(() => {
    Kakao.init(process.env.KAKAO_JAVASCRIPT_API_KEY);
  });

  return <LoginTemplate onLoginWithKakao={onLoginWithKakao} />;
};

export default Login;
