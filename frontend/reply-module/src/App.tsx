import CommentArea from "./components/pages/CommentArea";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import OAuth from "./components/pages/OAuth";
import { ROUTE } from "./constants/route";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTE.HOME} component={CommentArea} />
        <Route exact path={ROUTE.OAUTH} component={OAuth} />
        <Redirect to={ROUTE.HOME} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
