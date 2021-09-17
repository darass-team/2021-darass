import CommentArea from "./components/pages/CommentArea";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import OAuth from "./components/pages/OAuth";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={CommentArea} />
        <Route exact path="/oauth/:provider" component={OAuth} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
