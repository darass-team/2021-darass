import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ConditionalRoute } from "./components/@HOC/ConditionalRoute";
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
import { useUser } from "./hooks";

const nonAuthorizedRoute = [
  { path: ROUTE.NON_AUTHORIZED.OAUTH, component: OAuth, redirectPath: ROUTE.AUTHORIZED.MY_PROJECT },
  { path: ROUTE.NON_AUTHORIZED.LOGIN, component: Login, redirectPath: ROUTE.AUTHORIZED.MY_PROJECT }
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
  const { user, isLoading } = useUser();

  useEffect(() => {
    LoadableHome.preload();
  }, []);

  return (
    <>
      <Nav />
      <Sentry.ErrorBoundary fallback={<ErrorPage notice="에러가 발생했습니다." />}>
        <Switch>
          <Route exact path={ROUTE.COMMON.HOME} component={LoadableHome} />,
          <Route exact path={ROUTE.COMMON.ABOUT} component={About} />,
          <Route exact path={ROUTE.COMMON.NOTICE} render={() => <ErrorPage notice="개발중인 페이지 입니다." />} />
          {nonAuthorizedRoute.map(({ path, component, redirectPath }) => {
            return <ConditionalRoute path={path} component={component} condition={!user} redirectPath={redirectPath} />;
          })}
          {authorizedRoute.map(({ path, component }) => {
            return <ConditionalRoute path={path} component={component} condition={!!user || isLoading} />;
          })}
          <Redirect to={ROUTE.COMMON.HOME} />
        </Switch>
      </Sentry.ErrorBoundary>
    </>
  );
};
export default App;
