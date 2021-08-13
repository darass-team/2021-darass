import { Container, CopyRight, Logo, LogoButton, ServiceName } from "./styles";
import darassLogoSVG from "../../../assets/svg/darass-logo.svg";
import { getManagePageURLWithToken } from "../../../utils/getManagePageURLWithToken";

const Footer = () => {
  return (
    <Container>
      <CopyRight>&copy; Emergency Escape</CopyRight>
      <LogoButton href={getManagePageURLWithToken()} target="_blank" rel="noopener noreferrer">
        <Logo src={darassLogoSVG} alt="darass-logo" />
        <ServiceName>Darass</ServiceName>
      </LogoButton>
    </Container>
  );
};

export default Footer;
