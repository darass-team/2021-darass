import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ConditionalRoute } from "./components/HOC/ConditionalRoute";
import Nav from "./components/organisms/Nav";
import About from "./components/pages/About";
import ErrorPage from "./components/pages/ErrorPage";
import {
  LoadableHome,
  LoadableManage,
  LoadableMyProject,
  LoadableNewProject,
  LoadableProjectDetail,
  LoadableScriptPublishing,
  LoadableStatistics,
  LoadableUserProfile
} from "./components/pages/Loadable";
import Login from "./components/pages/Login";
import OAuth from "./components/pages/OAuth";
import { ROUTE } from "./constants";
import { useToken, useUser } from "./hooks";

const App = () => {
  const { user, isLoading } = useUser();
  const { refetchAccessToken } = useToken();

  useEffect(() => {
    refetchAccessToken();
    LoadableHome.preload();
  }, []);

  return (
    <>
      <Nav />
      <Sentry.ErrorBoundary fallback={<ErrorPage notice="에러가 발생했습니다." />}>
        <Switch>
          <Route exact path={ROUTE.COMMON.HOME} component={LoadableHome} />
          <Route exact path={ROUTE.COMMON.ABOUT} component={About} />
          <Route exact path={ROUTE.COMMON.NOTICE} render={() => <ErrorPage notice="개발중인 페이지 입니다." />} />
          <ConditionalRoute
            exact
            path={ROUTE.NON_AUTHORIZED.OAUTH}
            component={OAuth}
            condition={!user}
            redirectPath={ROUTE.AUTHORIZED.MY_PROJECT}
          />
          <ConditionalRoute
            path={ROUTE.NON_AUTHORIZED.LOGIN}
            component={Login}
            condition={!user}
            redirectPath={ROUTE.AUTHORIZED.MY_PROJECT}
          />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.USER_PROFILE}
            component={LoadableUserProfile}
            condition={!!user || isLoading}
          />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.SCRIPT_PUBLISHING}
            component={LoadableScriptPublishing}
            condition={!!user || isLoading}
          />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.NEW_PROJECT}
            component={LoadableNewProject}
            condition={!!user || isLoading}
          />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.PROJECT_MANAGE}
            component={LoadableManage}
            condition={!!user || isLoading}
          />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.STATISTICS}
            component={LoadableStatistics}
            condition={!!user || isLoading}
          />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.PROJECT_DETAIL}
            component={LoadableProjectDetail}
            condition={!!user || isLoading}
          />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.MY_PROJECT}
            component={LoadableMyProject}
            condition={!!user || isLoading}
          />

          <Redirect to={ROUTE.COMMON.HOME} />
        </Switch>
      </Sentry.ErrorBoundary>
    </>
  );
};
export default App;
