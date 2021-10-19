import moonSVG from "@/assets/svg/moon.svg";
import sunSVG from "@/assets/svg/sun.svg";
import { Ball, Container, Img } from "./styles";

export interface Props {
  isDarkModePage: boolean;
  onToggleDarkMode: () => void;
}

const DarkModeToggleButton = ({ isDarkModePage, onToggleDarkMode }: Props) => {
  return (
    <Container isDarkModePage={isDarkModePage} onClick={onToggleDarkMode}>
      <Img src={sunSVG} alt="light mode" width={15} />
      <Img src={moonSVG} alt="dark mode" width={15} />
      <Ball isDarkModePage={isDarkModePage} />
    </Container>
  );
};

export default DarkModeToggleButton;
