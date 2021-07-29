import { Button } from "./styles";
export interface Props {
  className?: string;
  numOfLikes: number;
  isLiked: boolean;
  onClick: () => void;
}

const LikingUsersButton = ({ className, numOfLikes, isLiked, onClick }: Props) => {
  return (
    <Button className={className} onClick={onClick} isLiked={isLiked}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.33341 17.4998H4.16675V6.6665H3.33341C2.89139 6.6665 2.46746 6.8421 2.1549 7.15466C1.84234 7.46722 1.66675 7.89114 1.66675 8.33317V15.8332C1.66675 16.2752 1.84234 16.6991 2.1549 17.0117C2.46746 17.3242 2.89139 17.4998 3.33341 17.4998ZM16.6667 6.6665H10.8334L11.7684 3.85984C11.8518 3.60935 11.8746 3.34263 11.8347 3.08163C11.7949 2.82064 11.6936 2.57285 11.5392 2.35867C11.3849 2.14448 11.1818 1.97004 10.9468 1.8497C10.7118 1.72936 10.4516 1.66657 10.1876 1.6665H10.0001L5.83341 6.19817V17.4998H15.0001L18.2601 10.3365L18.3334 9.99984V8.33317C18.3334 7.89114 18.1578 7.46722 17.8453 7.15466C17.5327 6.8421 17.1088 6.6665 16.6667 6.6665V6.6665Z"
          fill="#303030"
        />
      </svg>

      <span data-testid="liking-users-button-num-of-likes">{numOfLikes}</span>
    </Button>
  );
};

export default LikingUsersButton;
