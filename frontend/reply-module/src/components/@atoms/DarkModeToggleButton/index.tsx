import { useContext } from "react";
import { ThemeContext } from "styled-components";
import sunSVG from "@/assets/svg/sun.svg";
import moonSVG from "@/assets/svg/moon.svg";
import { Ball, Container, Img } from "./styles";

const DarkModeToggleButton = () => {
  const { isDarkModePage, onToggleDarkMode } = useContext(ThemeContext);

  return (
    <Container onClick={onToggleDarkMode}>
      <Img src={sunSVG} alt="light mode" width={15} />
      <Img src={moonSVG} alt="dark mode" width={15} />
      <Ball right={isDarkModePage} />
    </Container>
  );
};

export default DarkModeToggleButton;
