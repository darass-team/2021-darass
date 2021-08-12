import { HTMLAttributes, MouseEvent } from "react";
import defaultUserImage from "../../../assets/svg/default-user-image.svg";
import { Container } from "./styles";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  imageURL?: string;
  size?: Size;
  onClick?: (event: MouseEvent) => void;
  className?: string;
  alt?: string;
}

const Avatar = ({ imageURL, size = "MD", onClick, className, alt }: Props) => {
  return (
    <Container
      src={imageURL ? (imageURL === "guestProfileImageUrl" ? defaultUserImage : imageURL) : defaultUserImage}
      size={size}
      alt={alt}
      onClick={onClick}
      className={className}
    />
  );
};

export default Avatar;
