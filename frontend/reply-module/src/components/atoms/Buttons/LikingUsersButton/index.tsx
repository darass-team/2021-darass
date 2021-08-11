import { Button } from "./styles";
import { ReactComponent as Like } from "../../../../assets/svg/like.svg";
export interface Props {
  className?: string;
  numOfLikes: number;
  isLiked: boolean;
  onClick: () => void;
}

const LikingUsersButton = ({ className, numOfLikes, isLiked, onClick }: Props) => {
  return (
    <Button className={className} onClick={onClick} isLiked={isLiked}>
      <Like />
      <span data-testid="liking-users-button-num-of-likes">{numOfLikes}</span>
    </Button>
  );
};

export default LikingUsersButton;
