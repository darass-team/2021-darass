import { SVG } from "@/constants/clientAssets";
import { Ball, Container, Img } from "./styles";

export interface Props {
  isDarkModePage: boolean;
  onToggleDarkMode: () => void;
}

const DarkModeToggleButton = ({ isDarkModePage, onToggleDarkMode }: Props) => {
  return (
    <Container isDarkModePage={isDarkModePage} onClick={onToggleDarkMode}>
      <Img src={SVG.SUN_ICON} alt="light mode" width={15} />
      <Img src={SVG.MOON_ICON} alt="dark mode" width={15} />
      <Ball isDarkModePage={isDarkModePage} />
    </Container>
  );
};

export default DarkModeToggleButton;
