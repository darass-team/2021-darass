import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { PALETTE } from "../../../styles/palette";
import ScreenContainer from "../../../styles/ScreenContainer";
import Home from "../../templates/Home";

const HomePage = () => {
  const history = useHistory();

  const moveLoginPage = () => {
    history.push(ROUTE.LOGIN);
  };

  return (
    <ScreenContainer bgColor={PALETTE.PRIMARY}>
      <Home moveLoginPage={moveLoginPage} />
    </ScreenContainer>
  );
};

export default HomePage;
