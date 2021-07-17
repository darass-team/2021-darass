import Avatar from "../../atoms/Avatar";
import Hambuger from "../../../assets/svg/hambuger.svg";
import { Container, Wrapper, NavLink } from "./styles";
import { User } from "../../../types/user";
import { ROUTE } from "../../../constants";

export interface Props {
  user: User | undefined;
}

const Nav = ({ user }: Props) => {
  return (
    <Container>
      <img src={Hambuger} />
      <Wrapper>
        {user ? (
          <>
            <Avatar imageURL={user.profileImageUrl} />
            <NavLink to="/">{user.nickName}</NavLink>
          </>
        ) : (
          <NavLink to={ROUTE.LOGIN}>Login</NavLink>
        )}
      </Wrapper>
    </Container>
  );
};

export default Nav;
