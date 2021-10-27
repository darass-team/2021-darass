import { SVG } from "@/constants/clientAssets";
import { Img } from "./styles";

export interface Props {
  onClick: () => void;
  className?: string;
}

const BackIcon = ({ onClick, className }: Props) => {
  return (
    <Img className={className} src={SVG.BACK_BUTTON} onClick={onClick} width="20px" height="20px" alt="뒤로가기 버튼" />
  );
};

export default BackIcon;
