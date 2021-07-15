const getKakaoAccessToken = async () => {
  const { Kakao } = window;

  if (!Kakao.isInitialized()) {
    Kakao.init(process.env.KAKAO_JAVASCRIPT_API_KEY);
  }

  return new Promise((resolve, reject) =>
    Kakao.Auth.login({
      success: function (authObj: { access_token: string }) {
        const kakaoAccessToken = JSON.stringify(authObj.access_token);

        resolve(kakaoAccessToken);
      },
      fail: function (error: Error) {
        alert(JSON.stringify(error));
        reject(error);
      }
    })
  );
};

export { getKakaoAccessToken };
