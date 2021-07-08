import Avatar from "../../atoms/Avatar";
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
