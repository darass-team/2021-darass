import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Nav from "./components/organisms/Nav";
import About from "./components/pages/About";
import ErrorPage from "./components/pages/ErrorPage";
import {
  LoadableHome,
  LoadableManage,
  LoadableMyProject,
  LoadableNewProject,
  LoadableNotification,
  LoadableProjectDetail,
  LoadableScriptPublishing,
  LoadableStatistics,
  LoadableUserProfile
} from "./components/pages/Loadable";
import Login from "./components/pages/Login";
import OAuth from "./components/pages/OAuth";
import { ROUTE } from "./constants";
import { RecentlyAlarmContentContext } from "./context/recentlyAlarmContentContext";
import { UserContext } from "./context/userContext";
import { useRecentlyAlarmWebSocket, useToken, useUser } from "./hooks";

const nonAuthorizedRoute = [
  { path: ROUTE.NON_AUTHORIZED.OAUTH, component: OAuth },
  { path: ROUTE.NON_AUTHORIZED.LOGIN, component: Login }
];

const authorizedRoute = [
  { path: ROUTE.AUTHORIZED.USER_PROFILE, component: LoadableUserProfile },
  { path: ROUTE.AUTHORIZED.NOTIFICATION, component: LoadableNotification },
  { path: ROUTE.AUTHORIZED.SCRIPT_PUBLISHING, component: LoadableScriptPublishing },
  { path: ROUTE.AUTHORIZED.NEW_PROJECT, component: LoadableNewProject },
  { path: ROUTE.AUTHORIZED.PROJECT_MANAGE, component: LoadableManage },
  { path: ROUTE.AUTHORIZED.STATISTICS, component: LoadableStatistics },
  { path: ROUTE.AUTHORIZED.PROJECT_DETAIL, component: LoadableProjectDetail },
  { path: ROUTE.AUTHORIZED.MY_PROJECT, component: LoadableMyProject }
];

const App = () => {
  const { accessToken, removeAccessToken, isActiveAccessToken } = useToken();
  const { user, logout, refetch: refetchUser, isLoading, isSuccess } = useUser({ accessToken, removeAccessToken });
  const { recentlyAlarmContent, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime } = useRecentlyAlarmWebSocket({ user });

  useEffect(() => {
    LoadableHome.preload();
  }, []);

  useEffect(() => {
    console.log(window.location.pathname);
  }, [window.location.pathname]);

  return (
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
        <Nav />
        <Sentry.ErrorBoundary fallback={<ErrorPage notice="에러가 발생했습니다." />}>
          <Switch>
            <Route exact path={ROUTE.COMMON.HOME} component={LoadableHome} />
            <Route exact path={ROUTE.COMMON.ABOUT} component={About} />
            {isActiveAccessToken &&
              authorizedRoute.map(({ path, component }) => {
                return <Route exact key={path} path={path} component={component} />;
              })}
            {!isActiveAccessToken &&
              nonAuthorizedRoute.map(({ path, component }) => {
                return <Route exact key={path} path={path} component={component} />;
              })}
            <Redirect to={isActiveAccessToken ? ROUTE.AUTHORIZED.MY_PROJECT : ROUTE.COMMON.HOME} />
          </Switch>
        </Sentry.ErrorBoundary>
      </RecentlyAlarmContentContext.Provider>
    </UserContext.Provider>
  );
};
export default App;
