import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ROUTE } from "@/constants";
import { MenuType } from "@/types/menu";
import { Container, MainTitle } from "./styles";
import { SVG } from "@/constants/clientAssets";

export interface Props extends MenuType {
  subMenus?: Props[];
  depth?: number;
}

const MenuDropDown = ({ name, route, subMenus = [], depth = 0 }: Props) => {
  const history = useHistory();
  const [isDropDown, setDropDown] = useState<boolean | null>(null);

  const hasSubMenus = subMenus.length > 0;

  const onToggleDropDown = () => setDropDown(state => !state);
  const movePage = () => history.push(route || ROUTE.COMMON.HOME);
  const onClickMenu = hasSubMenus ? onToggleDropDown : movePage;

  return (
    <Container isDropDown={isDropDown}>
      <MainTitle onClick={onClickMenu} isDropDown={isDropDown} depth={depth}>
        {name}
        {hasSubMenus && <img src={SVG.ARROW_DOWN} alt={`${name} 메뉴 열기 버튼`} />}
      </MainTitle>

      {isDropDown !== null &&
        subMenus.map(({ name, route, subMenus }) => (
          <MenuDropDown key={name} name={name} route={route} subMenus={subMenus} depth={depth + 1} />
        ))}
    </Container>
  );
};

export default MenuDropDown;
