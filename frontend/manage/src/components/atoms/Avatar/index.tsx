import { MouseEvent } from "react";
import { Container } from "./styles";
import defaultUserImage from "../../../assets/svg/default-user-image.svg";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  imageURL?: string;
  size?: Size;
  onClick?: (event: MouseEvent) => void;
  className?: string;
}

const Avatar = ({ imageURL = defaultUserImage, size = "MD", onClick, className }: Props) => {
  return <Container src={imageURL} size={size} alt="프로필 사진" onClick={onClick} className={className} />;
};

export default Avatar;
