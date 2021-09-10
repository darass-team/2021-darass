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
  const interceptorRef = useRef<number>();

  useMemo(() => {
    if (accessToken) {
      interceptorRef.current = customAxios.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${accessToken}`;

        return config;
      });
    } else {
      if (interceptorRef.current === undefined) return;
      customAxios.interceptors.request.eject(interceptorRef.current);
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
