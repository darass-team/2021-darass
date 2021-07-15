import { Redirect, Route, RouteProps } from "react-router-dom";
import { ROUTE } from "../../constants";

interface ConditionalRouteProp extends RouteProps {
  condition: boolean;
  redirectPath?: string;
}

const ConditionalRoute = ({ component, path, condition, redirectPath = ROUTE.HOME }: ConditionalRouteProp) => {
  return condition ? <Route exact path={path} component={component} /> : <Redirect to={redirectPath} />;
};

export { ConditionalRoute };
