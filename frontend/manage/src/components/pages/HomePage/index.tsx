import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import Home from "../../templates/Home";

const HomePage = () => {
  const history = useHistory();

  const moveLoginPage = () => {
    history.push(ROUTE.LOGIN);
  };

  return <Home moveLoginPage={moveLoginPage} />;
};

export default HomePage;
