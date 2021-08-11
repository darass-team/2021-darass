import { MouseEvent } from "react";
import defaultUserImage from "../../../assets/svg/default-user-image.svg";
import { Container } from "./styles";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  imageURL?: string;
  size?: Size;
  onClick?: (event: MouseEvent) => void;
  className?: string;
}

const Avatar = ({ imageURL, size = "MD", onClick, className }: Props) => {
  return (
    <Container
      src={imageURL ? (imageURL === "guestProfileImageUrl" ? defaultUserImage : imageURL) : defaultUserImage}
      size={size}
      alt="프로필 사진"
      onClick={onClick}
      className={className}
    />
  );
};

export default Avatar;
