import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import LoadingPage from "@/components/@molecules/LoadingPage";
import CommentArea from "@/components/pages/CommentArea";
import OAuth from "@/components/pages/OAuth";
import { ROUTE } from "@/constants/route";
import { MessageChannelFromReplyModuleContext } from "@/hooks/contexts/useMessageFromReplyModule";
import { RecentlyAlarmContentContext } from "@/hooks/contexts/useRecentlyAlarmContentContext";
import { useReplyModuleApp } from "./useReplyModuleApp";
import { messageFromReplyModule } from "@/utils/postMessage";
import { useToken } from "@/hooks/api/token/useToken";
import { useUser } from "@/hooks";
import { UserContext } from "@/hooks/contexts/useUserContext";

const App = () => {
  const { accessToken, removeAccessToken } = useToken();
  const { user, logout, refetch: refetchUser, isLoading, isSuccess } = useUser({ accessToken, removeAccessToken });

  const { port, recentlyAlarmContent, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime, receivedMessageFromReplyModal } =
    useReplyModuleApp();

  return (
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
  );
};

export default App;
