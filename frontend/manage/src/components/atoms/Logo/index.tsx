import logo from "../../../assets/svg/logo.svg";

export interface Props {
  width: number;
}

const Logo = ({ width }: Props) => {
  return <img src={logo} width={width} height={width} />;
};

export default Logo;

