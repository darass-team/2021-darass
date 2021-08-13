import { Container } from "./styles";
import defaultUserImage from "../../../assets/svg/default-user-image.svg";
import { MouseEvent } from "react";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  imageURL?: string;
  onClick?: (event: MouseEvent) => void;
  size?: Size;
  alt?: string;
}

const Avatar = ({ imageURL, size = "MD", onClick, alt }: Props) => {
  return (
    <Container
      src={imageURL ? (imageURL === "guestProfileImageUrl" ? defaultUserImage : imageURL) : defaultUserImage}
      size={size}
      onClick={onClick}
      alt={alt}
      data-testid="avatar-img"
    />
  );
};

export default Avatar;
