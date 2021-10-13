interface Employee {
  name: string;
  imageURL: string;
  githubUrl: string;
  email: string;
  role: "Front-end Engineer" | "Back-end Engineer";
  description: string;
}

export const employees: Employee[] = [
  {
    name: "Jerry",
    imageURL: "https://avatars1.githubusercontent.com/u/41244373?v=4",
    githubUrl: "https://github.com/jaeseongDev",
    email: "qkrwotjd1445@naver.com",
    role: "Back-end Engineer",
    description: "댓글을 통해 관심과 사랑을 먹고 자라나는 다라쓰 개발자입니다."
  },
  {
    name: "Woogie",
    imageURL: "https://avatars1.githubusercontent.com/u/37281119?v=4",
    githubUrl: "https://github.com/jujubebat",
    email: "bbwwpark@naver.com",
    role: "Back-end Engineer",
    description: "안녕하세요. 백엔드 개발자 박병욱입니다."
  },
  {
    name: "Aron",
    imageURL: "https://avatars1.githubusercontent.com/u/68985748?v=4",
    githubUrl: "https://github.com/Sehwan-Jang",
    email: "whilter08@gmail.com",
    role: "Back-end Engineer",
    description: "안녕하세요. 백엔드 개발자 장세환입니다."
  },
  {
    name: "JayOn",
    imageURL: "https://avatars1.githubusercontent.com/u/56083021?v=4",
    githubUrl: "https://github.com/pjy1368",
    email: "basejin0810@naver.com",
    role: "Back-end Engineer",
    description: "무사히 돌아오겠습니다."
  },
  {
    name: "Goni",
    imageURL: "https://avatars1.githubusercontent.com/u/59409762?v=4",
    githubUrl: "https://github.com/yungo1846",
    email: "yungo1468@naver.com",
    role: "Front-end Engineer",
    description: "강해져서 돌아오겠습니다."
  },
  {
    name: "Doby",
    imageURL: "https://avatars1.githubusercontent.com/u/42544600?v=4",
    githubUrl: "https://github.com/zereight",
    email: "fullstackmachinelearning@gmail.com",
    role: "Front-end Engineer",
    description: "코드를 통해 기술적인 문제를 해결하는것에 관심이 많습니다."
  }
];
