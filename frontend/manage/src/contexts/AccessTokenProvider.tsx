import { createContext, Dispatch, ReactNode, SetStateAction, useMemo, useRef, useState } from "react";
import { customAxios } from "../utils/request";

interface InitialState {
  accessToken: string | null | undefined;
  setAccessToken: Dispatch<SetStateAction<string | null | undefined>>;
}

export const accessTokenContext = createContext<InitialState>({
  accessToken: null,
  setAccessToken: () => {}
});

const { Provider } = accessTokenContext;

interface Props {
  children: ReactNode;
}

const AccessTokenProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useState<string | null | undefined>();
  const interceptor = useRef<number>();

  useMemo(() => {
    if (accessToken) {
      console.log("accessToken이 생김");
      interceptor.current = customAxios.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${accessToken}`;

        return config;
      });
    } else {
      console.log("accessToken이 없어짐");

      interceptor.current && customAxios.interceptors.request.eject(interceptor.current);
    }
  }, [accessToken]);

  return (
    <Provider
      value={{
        accessToken,
        setAccessToken
      }}
    >
      {children}
    </Provider>
  );
};

export default AccessTokenProvider;
