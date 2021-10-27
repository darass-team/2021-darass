import { PNG } from "@/constants/clientAssets";
import { Container } from "./styles";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  size?: Size;
}

const Logo = ({ size = "MD" }: Props) => {
  return <Container src={PNG.LOGO} size={size} alt="다라쓰 로고" />;
};

export default Logo;
