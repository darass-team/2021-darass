import Avatar from "../../atoms/Avatar";
import { Container, NavLink } from "./styles";

export interface Props {
  user: {
    avatarURL: string;
    name: string;
  };
}

const Nav = ({ user }: Props) => {
  return (
    <Container>
      {user ? (
        <>
          <Avatar imageURL={user.avatarURL} />
          <NavLink to="/">{user.name}</NavLink>
        </>
      ) : (
        <NavLink to="/">Login</NavLink>
      )}
    </Container>
  );
};

export default Nav;
