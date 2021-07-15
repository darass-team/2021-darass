import { QUERY } from "../constants/api";
import { COOKIE_KEY } from "../constants/cookie";
import { request } from "../utils/request";
import { deleteCookie, setCookie } from "../utils/cookie";
import { getKakaoAccessToken } from "../utils/kakaoAPI";
import { useState } from "react";
import { User } from "../types/user";

const dummyUser: User = {
  id: 1,
  nickName: "도비",
  imageURL:
    "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
  type: "Signed"
};

const useLogin = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = async () => {
    try {
      const kakaoAccessToken = await getKakaoAccessToken();
      const serverAccessToken = await request.get(`${QUERY.LOGIN}${kakaoAccessToken}`);

      setCookie(COOKIE_KEY.ATK, serverAccessToken);
      setUser(dummyUser);
    } catch (error) {
      console.error(error.message);
    }
  };

  const logout = async () => {
    try {
      deleteCookie(COOKIE_KEY.ATK);
      setUser(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  return { user, login, logout };
};

export default useLogin;
