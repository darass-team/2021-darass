import backButton from "@/assets/svg/back-button.svg";
import { Img } from "./styles";

export interface Props {
  onClick: () => void;
  className?: string;
}

const BackIcon = ({ onClick, className }: Props) => {
  return (
    <Img className={className} src={backButton} onClick={onClick} width="20px" height="20px" alt="뒤로가기 버튼" />
  );
};

export default BackIcon;
