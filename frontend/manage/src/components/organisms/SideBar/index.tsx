import { MenuType } from "../../../types/menu";
import MenuDropDown from "../../atoms/MenuDropDown";
import { Container } from "./styles";

export interface Props {
  menus: MenuType[];
  className?: string;
}

const SideBar = ({ menus, className }: Props) => {
  return (
    <Container className={className}>
      {menus.map(({ name, route, subMenus }) => {
        return <MenuDropDown key={name} name={name} route={route} subMenus={subMenus} />;
      })}
    </Container>
  );
};

export default SideBar;
