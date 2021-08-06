import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { ConditionalRoute } from "./components/HOC/ConditionalRoute";
import Nav from "./components/organisms/Nav";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Manage from "./components/pages/Manage";
import MyProject from "./components/pages/MyProject";
import NewProject from "./components/pages/NewProject";
import ProjectDetail from "./components/pages/ProjectDetail";
import ScriptPublishingPage from "./components/pages/ScriptPublishing";
import UserProfile from "./components/pages/UserProfile";
import { ROUTE } from "./constants";
import { useUser } from "./hooks";

const App = () => {
  const { user, isLoading, logout } = useUser();

  return (
    <Router>
      <Nav user={user} logout={logout} />
      <Switch>
        <Route exact path={ROUTE.HOME} component={Home} />
        <ConditionalRoute path={ROUTE.LOGIN} component={Login} condition={!user} redirectPath={ROUTE.MY_PROJECT} />
        <ConditionalRoute path={ROUTE.USER_PROFILE} component={UserProfile} condition={!!user || isLoading} />
        <ConditionalRoute
          path={ROUTE.SCRIPT_PUBLISHING}
          component={ScriptPublishingPage}
          condition={!!user || isLoading}
        />
        <ConditionalRoute path={ROUTE.NEW_PROJECT} component={NewProject} condition={!!user || isLoading} />
        <ConditionalRoute path={ROUTE.PROJECT_MANAGE} component={Manage} condition={!!user || isLoading} />
        <ConditionalRoute path={ROUTE.PROJECT_DETAIL} component={ProjectDetail} condition={!!user || isLoading} />
        <ConditionalRoute path={ROUTE.MY_PROJECT} component={MyProject} condition={!!user || isLoading} />
        <Redirect to={ROUTE.HOME} />
      </Switch>
    </Router>
  );
};
export default App;
