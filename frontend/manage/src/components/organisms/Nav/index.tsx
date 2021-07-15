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
            <Avatar
              imageURL={
                "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75"
              }
            />
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
