import { User } from "../../../types/user";
import DesktopNav from "../DesktopNav";
import MobileNav from "../MobileNav";
import { Responsive } from "./styles";

export interface Props {
  user?: User;
  logout: () => void;
}

const Nav = ({ user, logout }: Props) => {
  return (
    <Responsive>
      <MobileNav user={user} logout={logout} />
      <DesktopNav user={user} logout={logout} />
    </Responsive>
  );
};

export default Nav;
