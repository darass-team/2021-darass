export interface MenuType {
  name: string;
  route?: string;
  subMenus?: MenuType[];
}
