import { useState } from "react";
import arrowDown from "../../../assets/svg/arrow-down.svg";
import { Container, MainTitle, SubTitle } from "./styles";

interface SubMenuType {
  title: string;
  onClick: () => void;
}

export interface Props {
  title: string;
  onClick?: () => void;
  menu?: SubMenuType[];
}

const MenuDropDown = ({ title, onClick, menu }: Props) => {
  const [isDropDown, setDropDown] = useState(false);

  return (
    <Container>
      {menu?.length ? (
        <MainTitle isDropDown={isDropDown} onClick={() => setDropDown(state => !state)}>
          {title}
          {menu?.length && <img src={arrowDown} alt={`${title} 메뉴 열기 버튼`} />}
        </MainTitle>
      ) : (
        <MainTitle isDropDown={isDropDown} onClick={onClick}>
          {title}
        </MainTitle>
      )}

      {isDropDown &&
        menu?.map(menu => (
          <SubTitle onClick={menu.onClick} key={menu.title}>
            {menu.title}
          </SubTitle>
        ))}
    </Container>
  );
};

export default MenuDropDown;
