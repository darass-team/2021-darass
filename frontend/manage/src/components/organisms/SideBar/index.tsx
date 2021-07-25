import MenuDropDown from "../../atoms/MenuDropDown";
import { Container } from "./styles";

const SideBar = () => {
  return (
    <Container>
      <MenuDropDown title="프로젝트 정보" />
      <MenuDropDown
        title="통계"
        menu={[
          { title: "전체", onClick: () => {} },
          { title: "페이지 별", onClick: () => {} }
        ]}
      />
      <MenuDropDown title="관리" menu={[{ title: "전체", onClick: () => {} }]} />
      <MenuDropDown title="프로젝트 정보" />
    </Container>
  );
};

export default SideBar;
