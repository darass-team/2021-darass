import { createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState } from "react";
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

  useMemo(() => {
    customAxios.interceptors.request.use(config => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });
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
