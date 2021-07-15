import Avatar from "../../atoms/Avatar";
import Hambuger from "../../../assets/svg/hambuger.svg";
import { Container, Wrapper, NavLink } from "./styles";

export interface Props {
  user?: {
    avatarURL: string;
    name: string;
  };
}

const Nav = ({ user }: Props) => {
  return (
    <Container>
      <img src={Hambuger} />
      <Wrapper>
        {user ? (
          <>
            <Avatar imageURL={user.avatarURL} />
            <NavLink to="/">{user.name}</NavLink>
          </>
        ) : (
          <NavLink to="/">Login</NavLink>
        )}
      </Wrapper>
    </Container>
  );
};

export default Nav;
