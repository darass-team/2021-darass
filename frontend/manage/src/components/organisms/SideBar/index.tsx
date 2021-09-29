import { MenuType } from "@/types/menu";
import MenuDropDown from "@/components/atoms/MenuDropDown";
import { Container } from "./styles";
import { useEffect } from "react";
import {
  LoadableManage,
  LoadableNotification,
  LoadableProjectDetail,
  LoadableScriptPublishing,
  LoadableStatistics
} from "@/components/pages/Loadable";

export interface Props {
  menus: MenuType[];
  className?: string;
}

const SideBar = ({ menus, className }: Props) => {
  useEffect(() => {
    LoadableScriptPublishing.preload();
    LoadableStatistics.preload();
    LoadableManage.preload();
    LoadableProjectDetail.preload();
    LoadableNotification.preload();
  }, []);

  return (
    <Container className={className}>
      {menus.map(({ name, route, subMenus }) => {
        return <MenuDropDown key={name} name={name} route={route} subMenus={subMenus} />;
      })}
    </Container>
  );
};

export default SideBar;
