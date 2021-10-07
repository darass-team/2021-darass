import { Button } from "./styles";
import { ReactComponent as Like } from "../../../assets/svg/like.svg";
export interface Props {
  numOfLikes: number;
  alreadyLiked: boolean;
  onClick: () => void;
}

const LikingUsersButton = ({ numOfLikes, alreadyLiked, onClick, ...props }: Props) => {
  return (
    <Button onClick={onClick} isLiked={alreadyLiked} {...props}>
      <Like data-testid="like-svg" />
      <span>{numOfLikes}</span>
    </Button>
  );
};

export default LikingUsersButton;
