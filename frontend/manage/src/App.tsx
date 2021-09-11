import * as Sentry from "@sentry/react";
import { useContext, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { ConditionalRoute } from "./components/HOC/ConditionalRoute";
import Nav from "./components/organisms/Nav";
import About from "./components/pages/About";
import ErrorPage from "./components/pages/ErrorPage";
import Home from "./components/pages/Home";
import { LoadableScriptPublishing, LoadableStatistics } from "./components/pages/Loadable";
import Login from "./components/pages/Login";
import Manage from "./components/pages/Manage";
import MyProject from "./components/pages/MyProject";
import NewProject from "./components/pages/NewProject";
import OAuth from "./components/pages/OAuth";
import ProjectDetail from "./components/pages/ProjectDetail";
import UserProfile from "./components/pages/UserProfile";
import { ROUTE } from "./constants";
import { useUser } from "./hooks";

const App = () => {
  const { user, isLoading } = useUser();

  return (
    <>
      <Nav />
      <Sentry.ErrorBoundary fallback={<ErrorPage notice="에러가 발생했습니다." />}>
        <Switch>
          <Route exact path={ROUTE.COMMON.HOME} component={Home} />
          <Route exact path={ROUTE.COMMON.ABOUT} component={About} />
          <Route exact path={ROUTE.COMMON.NOTICE} render={() => <ErrorPage notice="개발중인 페이지 입니다." />} />
          <ConditionalRoute exact path={ROUTE.NON_AUTHORIZED.OAUTH} component={OAuth} condition={!user} />
          <ConditionalRoute path={ROUTE.NON_AUTHORIZED.LOGIN} component={Login} condition={!user} />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.USER_PROFILE}
            component={UserProfile}
            condition={!!user || isLoading}
          />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.SCRIPT_PUBLISHING}
            component={LoadableScriptPublishing}
            condition={!!user || isLoading}
          />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.NEW_PROJECT}
            component={NewProject}
            condition={!!user || isLoading}
          />
          <ConditionalRoute path={ROUTE.AUTHORIZED.PROJECT_MANAGE} component={Manage} condition={!!user || isLoading} />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.STATISTICS}
            component={LoadableStatistics}
            condition={!!user || isLoading}
          />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.PROJECT_DETAIL}
            component={ProjectDetail}
            condition={!!user || isLoading}
          />
          <ConditionalRoute path={ROUTE.AUTHORIZED.MY_PROJECT} component={MyProject} condition={!!user || isLoading} />

          <Redirect to={ROUTE.COMMON.HOME} />
        </Switch>
      </Sentry.ErrorBoundary>
    </>
  );
};
export default App;
