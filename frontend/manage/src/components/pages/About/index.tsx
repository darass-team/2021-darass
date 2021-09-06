import { useScrollFadeInOut } from "@/hooks";
import ScreenContainer from "@/styles/ScreenContainer";
import Avatar from "@/components/atoms/Avatar";
import {
  Container,
  Detail,
  EmployeeInfo,
  EmployeeInfoContainer,
  Title,
  Name,
  Description,
  Email,
  Role,
  GithubLink
} from "./styles";

interface Employee {
  name: string;
  imageURL: string;
  githubUrl: string;
  email: string;
  role: "Front-end Engineer" | "Back-end Engineer";
  description: string;
}

const employees: Employee[] = [
  {
    name: "Jerry",
    imageURL: "https://avatars1.githubusercontent.com/u/41244373?v=4",
    githubUrl: "https://github.com/jaeseongDev",
    email: "1@1.com",
    role: "Back-end Engineer",
    description: "킹 너네 나 못이겨"
  },
  {
    name: "Woogie",
    imageURL: "https://avatars1.githubusercontent.com/u/37281119?v=4",
    githubUrl: "https://github.com/jujubebat",
    email: "2@2.com",
    role: "Back-end Engineer",
    description: "랕타타"
  },
  {
    name: "Aron",
    imageURL: "https://avatars1.githubusercontent.com/u/68985748?v=4",
    githubUrl: "https://github.com/Sehwan-Jang",
    email: "3@3.com",
    role: "Back-end Engineer",
    description: "슉슉슉슉슈슈슉"
  },
  {
    name: "JayOn",
    imageURL: "https://avatars1.githubusercontent.com/u/56083021?v=4",
    githubUrl: "https://github.com/pjy1368",
    email: "5@5.com",
    role: "Back-end Engineer",
    description: "충생!"
  },
  {
    name: "Goni",
    imageURL: "https://avatars1.githubusercontent.com/u/59409762?v=4",
    githubUrl: "https://github.com/yungo1846",
    email: "4@4.com",
    role: "Front-end Engineer",
    description: "좋아하는 연설가: 지그지글러"
  },
  {
    name: "Doby",
    imageURL: "https://avatars1.githubusercontent.com/u/42544600?v=4",
    githubUrl: "https://github.com/zereight",
    email: "fullstackmachinelearning@gmail.com",
    role: "Front-end Engineer",
    description: "코드를 통해 비즈니스적인 가치를 창출하는것에 관심이 많습니다."
  }
];

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

  return (
    <ScreenContainer>
      <Container>
        <Title>About Us</Title>

        <EmployeeInfoContainer>
          {employees.map(({ name, imageURL, githubUrl, email, role, description }, index) => {
            return (
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
            );
          })}
        </EmployeeInfoContainer>
      </Container>
    </ScreenContainer>
  );
};

export default About;
