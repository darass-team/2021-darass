import { Container } from "./styles";
import defaultUserImage from "../../../assets/svg/default-user-image.svg";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  imageURL?: string;
  onClick?: () => void;
  size?: Size;
}

const Avatar = ({ imageURL, size = "MD", onClick }: Props) => {
  return <Container src={imageURL || defaultUserImage} size={size} onClick={onClick} />;
};

export default Avatar;
