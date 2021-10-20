import LoadingPage from "@/components/@molecules/LoadingPage";
import CommentArea from "@/components/pages/CommentArea";
import OAuth from "@/components/pages/OAuth";
import { ROUTE } from "@/constants/route";
import { useUser } from "@/hooks";
import { MessageChannelFromReplyModuleContext } from "@/hooks/contexts/useMessageFromReplyModule";
import { RecentlyAlarmContentContext } from "@/hooks/contexts/useRecentlyAlarmContentContext";
import { UserContext } from "@/hooks/contexts/useUserContext";
import { messageFromReplyModule } from "@/utils/postMessage";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useReplyModuleApp } from "./useReplyModuleApp";

const getIsDarkModePageParam = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const isDarkModePageString = urlParams.get("darkMode");

  return isDarkModePageString === "true" ? true : false;
};

const App = () => {
  const { user, logout, refetchUser, isLoading, isSuccess, accessToken, refetchAccessToken } = useUser();

  const isDarkModePage = getIsDarkModePageParam();

  const { port, recentlyAlarmContent, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime, receivedMessageFromReplyModal } =
    useReplyModuleApp();

  return (
    <ThemeProvider
      theme={{
        isDarkModePage
      }}
    >
      <MessageChannelFromReplyModuleContext.Provider
        value={{
          setScrollHeight: messageFromReplyModule(port).setScrollHeight,
          openAlert: messageFromReplyModule(port).openAlert,
          openConfirmModal: messageFromReplyModule(port).openConfirmModal,
          openAlarmModal: messageFromReplyModule(port).openAlarmModal,
          openLikingUserModal: messageFromReplyModule(port).openLikingUserModal,
          receivedMessageFromReplyModal
        }}
      >
        <UserContext.Provider
          value={{
            user,
            logout,
            refetchUser,
            refetchAccessToken,
            accessToken,
            isLoadingUserRequest: isLoading,
            isSuccessUserRequest: isSuccess
          }}
        >
          <RecentlyAlarmContentContext.Provider
            value={{ recentlyAlarmContent, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime }}
          >
            <BrowserRouter>
              <Switch>
                <Route exact path={ROUTE.HOME} component={port ? CommentArea : LoadingPage} />
                <Route exact path={ROUTE.OAUTH} component={OAuth} />
                <Redirect to={ROUTE.HOME} />
              </Switch>
            </BrowserRouter>
          </RecentlyAlarmContentContext.Provider>
        </UserContext.Provider>
      </MessageChannelFromReplyModuleContext.Provider>
    </ThemeProvider>
  );
};

export default App;
