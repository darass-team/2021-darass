import { Container, Logo, LogoButton, ServiceName } from "./styles";
import darassLogoSVG from "../../../assets/svg/darass-logo.svg";

const Footer = () => {
  return (
    <Container>
      <LogoButton>
        <Logo src={darassLogoSVG} alt="darass-logo" />
        <ServiceName>Darass</ServiceName>
      </LogoButton>
    </Container>
  );
};

export default Footer;
