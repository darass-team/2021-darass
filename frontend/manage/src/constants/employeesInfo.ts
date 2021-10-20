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
    description: "누구보다 다라쓰 서비스에 애착을 가지고 있는 박병욱입니다."
  },
  {
    name: "Aron",
    imageURL: "https://avatars1.githubusercontent.com/u/68985748?v=4",
    githubUrl: "https://github.com/Sehwan-Jang",
    email: "whilter08@gmail.com",
    role: "Back-end Engineer",
    description: "다라쓰 백엔드 개발자 장세환입니다. 서버에 문제가 있거든 저에게 문의해주세요."
  },
  {
    name: "JayOn",
    imageURL: "https://avatars1.githubusercontent.com/u/56083021?v=4",
    githubUrl: "https://github.com/pjy1368",
    email: "basejin0810@naver.com",
    role: "Back-end Engineer",
    description: "국방의 의무와 다라쓰를 겸업하고 있습니다."
  },
  {
    name: "Goni",
    imageURL: "https://avatars1.githubusercontent.com/u/59409762?v=4",
    githubUrl: "https://github.com/yungo1846",
    email: "yungo1468@naver.com",
    role: "Front-end Engineer",
    description: "금융은 토스, 댓글은 다라쓰를 사용해주세요."
  },
  {
    name: "Doby",
    imageURL: "https://avatars1.githubusercontent.com/u/42544600?v=4",
    githubUrl: "https://github.com/zereight",
    email: "fullstackmachinelearning@gmail.com",
    role: "Front-end Engineer",
    description: "개발에 몰입하는 것을 너무너무 좋아하는 개발자, 김정혁입니다."
  }
];
