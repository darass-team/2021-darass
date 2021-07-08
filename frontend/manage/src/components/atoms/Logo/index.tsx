import logo from "../../../assets/svg/logo.svg";
import { Container } from "./styles";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  size?: Size;
}

const Logo = ({ size = "MD" }: Props) => {
  return <Container src={logo} size={size} />;
};

export default Logo;
