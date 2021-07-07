import { Container } from "./styles";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  imageURL: string;
  size?: Size;
}

const Avatar = ({ imageURL, size = "MD" }: Props) => {
  return <Container src={imageURL} size={size} />;
};

export default Avatar;
