import { Button } from "./styles";
import { ReactComponent as Like } from "@/assets/svg/like.svg";
export interface Props {
  numOfLikes: number;
  isLiked: boolean;
  onClick: () => void;
}

const LikingUsersButton = ({ numOfLikes, isLiked, onClick, ...props }: Props) => {
  return (
    <Button onClick={onClick} isLiked={isLiked} {...props}>
      <Like data-testid="like-svg" />
      <span>{numOfLikes}</span>
    </Button>
  );
};

export default LikingUsersButton;
