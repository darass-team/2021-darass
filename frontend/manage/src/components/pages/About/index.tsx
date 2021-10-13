import ScreenContainer from "@/components/@style/ScreenContainer";
import { employees } from "@/constants/employeesInfo";
import { useDocumentTitle, useScrollFadeInOut } from "@/hooks";
import {
  Avatar,
  Container,
  Description,
  Detail,
  Email,
  EmployeeInfo,
  EmployeeInfoContainer,
  GithubLink,
  Name,
  Role,
  Title
} from "./styles";

const About = () => {
  const animations = Array.from({ length: employees.length }, (_, index) => {
    return useScrollFadeInOut({
      direction: "left",
      duration: 1,
      delay: 0.1 * index,
      threshold: 0.1,
      fadeType: "in"
    });
  });
  useDocumentTitle("팀 소개");

  return (
    <ScreenContainer>
      <Container>
        <Title>About Us</Title>
        <EmployeeInfoContainer>
          {employees.map(({ name, imageURL, githubUrl, email, role, description }, index) => (
            <EmployeeInfo key={email} {...animations[index]}>
              <Avatar size="LG" imageURL={imageURL} alt={`${name} 프로필 이미지`} />

              <Detail>
                <Name>{name}</Name>
                <Description>{description}</Description>
                <Role>{role}</Role>
                <Email>Email: {email}</Email>
                <GithubLink href={githubUrl} target="_blank" rel="noreferrer noopener">
                  Github
                </GithubLink>
              </Detail>
            </EmployeeInfo>
          ))}
        </EmployeeInfoContainer>
      </Container>
    </ScreenContainer>
  );
};

export default About;
