import LoadingPage from "@/components/@molecules/LoadingPage";
import CommentArea from "@/components/pages/CommentArea";
import OAuth from "@/components/pages/OAuth";
import { ROUTE } from "@/constants/route";
import { PALETTE } from "@/constants/styles/palette";
import { useRecentlyAlarmWebSocket, useUser } from "@/hooks";
import { MessageChannelFromReplyModuleContext } from "@/hooks/contexts/useMessageFromReplyModule";
import { RecentlyAlarmContentContext } from "@/hooks/contexts/useRecentlyAlarmContentContext";
import { UserContext } from "@/hooks/contexts/useUserContext";
import { messageFromReplyModule } from "@/utils/postMessage";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useReplyModuleApp } from "./useReplyModuleApp";

const getReplyModuleParams = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const isDarkModePage = urlParams.get("darkMode") === undefined ? "false" : urlParams.get("darkMode");
  const primaryColor = decodeURIComponent(urlParams.get("primaryColor") || PALETTE.PRIMARY);

  const isShowSortOption = urlParams.get("isShowSortOption") === undefined ? "true" : urlParams.get("isShowSortOption");
  const isAllowSocialLogin =
    urlParams.get("isAllowSocialLogin") === undefined ? "true" : urlParams.get("isAllowSocialLogin");
  const isShowLogo = urlParams.get("isShowLogo") === undefined ? "true" : urlParams.get("isShowLogo");

  return {
    isDarkModePage: isDarkModePage === "true" ? true : false,
    primaryColor,
    isShowSortOption: isShowSortOption === "true" ? true : false,
    isAllowSocialLogin: isAllowSocialLogin === "true" ? true : false,
    isShowLogo: isShowLogo === "true" ? true : false
  };
};

const App = () => {
  const { isDarkModePage, primaryColor, isShowSortOption, isAllowSocialLogin, isShowLogo } = getReplyModuleParams();

  const { user, logout, refetchUser, isLoading, isSuccess, accessToken, refetchAccessToken } = useUser();

  const { recentlyAlarmContent, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime } = useRecentlyAlarmWebSocket(user);

  const { port, receivedMessageFromReplyModal } = useReplyModuleApp();

  return (
    <ThemeProvider
      theme={{
        isDarkModePage,
        primaryColor,
        uiInfo: {
          isShowSortOption,
          isAllowSocialLogin,
          isShowLogo
        }
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
                <Route exact path={ROUTE.HOME} render={() => <CommentArea isVisible={!!port} />} />
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
