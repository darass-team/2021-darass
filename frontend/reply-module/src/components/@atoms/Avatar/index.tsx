import { MouseEventHandler } from "react";
import { Container } from "./styles";
import { SVG } from "@/constants/clientAssets";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  imageURL?: string;
  onClick?: MouseEventHandler<HTMLImageElement>;
  size?: Size;
  alt?: string;
}

const Avatar = ({ imageURL, size = "MD", onClick, alt = "avatar", ...props }: Props) => {
  return (
    <Container
      src={imageURL ? imageURL : SVG.DEFAULT_USER_IMAGE}
      size={size}
      onClick={onClick}
      alt={alt}
      data-testid="avatar-img"
      {...props}
    />
  );
};

export default Avatar;
