import defaultUserImage from "@/assets/svg/default-user-image.svg";
import { MouseEventHandler } from "react";
import { Container } from "./styles";

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
      src={imageURL ? imageURL : defaultUserImage}
      size={size}
      onClick={onClick}
      alt={alt}
      data-testid="avatar-img"
      {...props}
    />
  );
};

export default Avatar;
