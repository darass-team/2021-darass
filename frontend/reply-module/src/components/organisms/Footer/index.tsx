import { Container, CopyRight, Logo, LogoButton, ServiceName } from "./styles";
import darassLogoSVG from "../../../assets/svg/darass-logo.svg";
import { MANAGE_PAGE_DOMAIN } from "../../../constants/domain";

const Footer = () => {
  return (
    <Container>
      <CopyRight>&copy; Emergency Escape</CopyRight>
      <LogoButton href={MANAGE_PAGE_DOMAIN} target="_blank" rel="noopener noreferrer">
        <Logo src={darassLogoSVG} alt="darass-logo" />
        <ServiceName>Darass</ServiceName>
      </LogoButton>
    </Container>
  );
};

export default Footer;
