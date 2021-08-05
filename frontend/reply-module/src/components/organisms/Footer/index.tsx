import { Container, CopyRight, Logo, LogoButton, ServiceName } from "./styles";
import darassLogoSVG from "../../../assets/svg/darass-logo.svg";
import { MANAGE_PAGE_BASE_URL } from "../../../constants/api";

const Footer = () => {
  return (
    <Container>
      <CopyRight>ⓒ DARASS</CopyRight>
      <LogoButton href={MANAGE_PAGE_BASE_URL} target="_blank" rel="noopener noreferrer">
        <Logo src={darassLogoSVG} alt="darass-logo" />
        <ServiceName>Darass</ServiceName>
      </LogoButton>
    </Container>
  );
};

export default Footer;
