import { Container, CopyRight, Logo, LogoButton, ServiceName } from "./styles";
import { PNG } from "@/constants/clientAssets";
import { MANAGE_PAGE_DOMAIN } from "@/constants/domain";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

const Footer = () => {
  const {
    uiInfo: { isShowLogo }
  } = useContext(ThemeContext);

  return (
    <Container>
      <CopyRight>&copy; Emergency Escape</CopyRight>
      <LogoButton href={MANAGE_PAGE_DOMAIN} target="_blank" rel="noopener noreferrer" role="link">
        {isShowLogo && <Logo src={PNG.LOGO} alt="darass-logo" />}
        <ServiceName>Darass</ServiceName>
      </LogoButton>
    </Container>
  );
};

export default Footer;
