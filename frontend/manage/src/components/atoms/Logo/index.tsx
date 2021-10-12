import logo from "@/assets/png/logo.png";
import { Container } from "./styles";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  size?: Size;
}

const Logo = ({ size = "MD" }: Props) => {
  return <Container src={logo} size={size} alt="다라쓰 로고" />;
};

export default Logo;
