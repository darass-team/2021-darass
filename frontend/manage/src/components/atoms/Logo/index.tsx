import { PNG } from "@/constants/clientAssets";
import { useState } from "react";
import { Container } from "./styles";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  size?: Size;
}

const Logo = ({ size = "MD" }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Container
      isImageLoaded={isImageLoaded}
      src={PNG.LOGO}
      size={size}
      alt="다라쓰 로고"
      onLoad={() => setIsImageLoaded(true)}
    />
  );
};

export default Logo;
