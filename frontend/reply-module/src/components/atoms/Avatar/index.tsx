import { Container } from "./styles";
import defaultUserImage from "../../../assets/svg/default-user-image.svg";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  imageURL?: string;
  onClick?: () => void;
  size?: Size;
  alt?: string;
}

const Avatar = ({ imageURL, size = "MD", onClick, alt }: Props) => {
  return (
    <Container src={imageURL || defaultUserImage} size={size} onClick={onClick} alt={alt} data-testid="avatar-img" />
  );
};

export default Avatar;
