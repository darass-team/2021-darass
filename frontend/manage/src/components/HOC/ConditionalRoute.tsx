import { Redirect, Route, RouteProps } from "react-router-dom";
import { ROUTE } from "../../constants";

interface ConditionalRouteProp extends RouteProps {
  condition: boolean;
}

const ConditionalRoute = ({ component, path, condition }: ConditionalRouteProp) => {
  return condition ? <Route exact path={path} component={component} /> : <Redirect to={ROUTE.HOME} />;
};

export { ConditionalRoute };
