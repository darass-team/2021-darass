import { PALETTE } from "../../../styles/palette";
import ScreenContainer from "../../../styles/ScreenContainer";
import HomeTemplate from "../../templates/Home";

const Home = () => {
  return (
    <ScreenContainer bgColor={PALETTE.PRIMARY}>
      <HomeTemplate />
    </ScreenContainer>
  );
};

export default Home;
