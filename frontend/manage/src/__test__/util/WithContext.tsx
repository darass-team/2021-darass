import { userContext } from "@/contexts/UserProvider";
import { User } from "@/types/user";
import { ReactNode, useState } from "react";
import { createMemoryHistory, MemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import { Router } from "react-router";
import { socialLoginUser } from "../fixture/user";

interface Props {
  children: ReactNode;
  logined?: boolean;
  history?: MemoryHistory<unknown>;
}

const WithContext = ({ children, logined = false, history = createMemoryHistory() }: Props) => {
  const [user, setUser] = useState<User | undefined>(() => {
    return logined ? socialLoginUser : undefined;
  });
  const [accessToken, setAccessToken] = useState<string | undefined>(() => {
    return logined ? "accessToken" : undefined;
  });

  const { Provider } = userContext;

  return (
    <Provider
      value={{
        user,
        isLoading: false,
        logout: () => {
          setUser(undefined);
          setAccessToken(undefined);
        },
        accessToken,
        setAccessToken: () => {
          setUser(socialLoginUser);
          setAccessToken("accessToken");
        }
      }}
    >
      <Router history={history}>{children}</Router>
    </Provider>
  );
};

export default WithContext;
