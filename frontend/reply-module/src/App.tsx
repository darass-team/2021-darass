import CommentArea from "./components/pages/CommentArea";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import OAuth from "./components/pages/OAuth";
import AccessTokenProvider from "./contexts/AccessTokenProvider";

const App = () => {
  return (
    <AccessTokenProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={CommentArea} />
          <Route exact path="/oauth/:provider" component={OAuth} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </AccessTokenProvider>
  );
};

export default App;
