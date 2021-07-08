import { PALETTE } from "../../../styles/palette";
import ScreenContainer from "../../../styles/ScreenContainer";
import Nav from "../../organisms/Nav";
import HomeTemplate from "../../templates/Home";

const Home = () => {
  return (
    <ScreenContainer bgColor={PALETTE.PRIMARY}>
      <HomeTemplate />
    </ScreenContainer>
  );
};

export default Home;
