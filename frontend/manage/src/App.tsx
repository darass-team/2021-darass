import * as Sentry from "@sentry/react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ConditionalRoute } from "./components/HOC/ConditionalRoute";
import Nav from "./components/organisms/Nav";
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
          <Route exact path={ROUTE.HOME} component={Home} />

          <Route exact path={ROUTE.OAUTH} component={OAuth} />

          <Route exact path={ROUTE.ABOUT} render={() => <ErrorPage notice="개발중인 페이지 입니다." />} />
          <Route exact path={ROUTE.NOTICE} render={() => <ErrorPage notice="개발중인 페이지 입니다." />} />
          <ConditionalRoute path={ROUTE.LOGIN} component={Login} condition={!user} redirectPath={ROUTE.MY_PROJECT} />
          <ConditionalRoute path={ROUTE.USER_PROFILE} component={UserProfile} condition={!!user || isLoading} />
          <ConditionalRoute
            path={ROUTE.SCRIPT_PUBLISHING}
            component={LoadableScriptPublishing}
            condition={!!user || isLoading}
          />
          <ConditionalRoute path={ROUTE.NEW_PROJECT} component={NewProject} condition={!!user || isLoading} />
          <ConditionalRoute path={ROUTE.PROJECT_MANAGE} component={Manage} condition={!!user || isLoading} />
          <ConditionalRoute path={ROUTE.STATISTICS} component={LoadableStatistics} condition={!!user || isLoading} />
          <ConditionalRoute path={ROUTE.PROJECT_DETAIL} component={ProjectDetail} condition={!!user || isLoading} />
          <ConditionalRoute path={ROUTE.MY_PROJECT} component={MyProject} condition={!!user || isLoading} />
          <Redirect to={ROUTE.HOME} />
        </Switch>
      </Sentry.ErrorBoundary>
    </>
  );
};
export default App;
