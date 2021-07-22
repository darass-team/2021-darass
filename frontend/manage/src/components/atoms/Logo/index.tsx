import { useEffect, useRef } from "react";
import logo from "../../../assets/svg/logo.svg";
import { useMouseMoveAnimation } from "../../../hooks";
import { Container } from "./styles";

export type Size = "SM" | "MD" | "LG" | "XL";

export interface Props {
  size?: Size;
}

const Logo = ({ size = "MD" }: Props) => {
  const ref = useRef<HTMLImageElement>(null);
  const { runAnimation } = useMouseMoveAnimation();

  useEffect(() => {
    if (!ref.current) return;

    runAnimation(ref.current);
  }, [ref.current]);

  return <Container src={logo} size={size} ref={ref} />;
};

export default Logo;
