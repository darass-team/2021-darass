import { SVG } from "@/constants/clientAssets";
import { MouseEvent } from "react";
import { Container } from "./styles";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  imageURL?: string;
  size?: Size;
  onClick?: (event: MouseEvent) => void;
  className?: string;
  alt?: string;
}

const Avatar = ({ imageURL, size = "MD", onClick, className, alt, ...props }: Props) => {
  return (
    <Container
      src={
        imageURL ? (imageURL === "guestProfileImageUrl" ? SVG.DEFAULT_USER_IMAGE : imageURL) : SVG.DEFAULT_USER_IMAGE
      }
      size={size}
      alt={alt}
      onClick={onClick}
      className={className}
      {...props}
    />
  );
};

export default Avatar;
