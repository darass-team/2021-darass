<p align="middle" >
  <img width="200px;" src="https://github.com/woowacourse-teams/2021-darass/blob/main/frontend/reply-module/src/assets/svg/darass-logo.svg" alt="darass-logo"/>
</p>
<h1 align="middle">다라쓰</h1>
<h3 align="middle">어디든지 쉽고 간편하게 다는 댓글 모듈 서비스</h3>

<br/>


## 📝 Introduce

다라쓰는 스크립트 코드를 웹 페이지에 붙여넣는 것만으로 간편하게 댓글 기능을 추가할 수 있는 댓글 모듈 서비스 입니다.

사용자에게 필요한 댓글 기능과 함께 운영에 필요한 댓글 통계 및 관리 기능도 제공합니다.

## 🐤 Demo
- [다라쓰 체험해보기](https://darass-test.tistory.com/1)

- [다라쓰 시작하기](https://darass.co.kr)

<br/>

## ⭐ Main Feature
- 웹 페이지에 서비스에서 제공하는 스크립트 코드를 추가하면, 댓글 모듈이 추가되는 기능
- 관리자 페이지에서 댓글 통계를 확인하고 댓글을 관리할 수 있는 기능
- oauth2 로그인 / 로그아웃 기능



## 🔧 Stack

**Frontend(Web)**
- **Language** : TypeScript
- **Library & Framework** : React, React Query, Styled-Components, Webpack, Babel
- **Test** : Jest, RTL, Storybook
- **Deploy**: AWS(S3, Cloudfront)
- **CI/CD** : Github Actions
<br />

**Backend, Devops**
- **Language** : Java 
- **Library & Framework** : Spring Boot
- **Database** : MariaDB
- **ORM** : JPA
- **Deploy**: AWS(EC2, S3, ELB), Docker, Nginx, ELK
- **CI/CD** : Github Actions, Jenkins

## 🔨 Front-End Architecture
![아키텍처](https://user-images.githubusercontent.com/42544600/134764981-617e61d1-fdf9-470a-80ae-26ffef230949.png)

## 🔨 Back-End Architecture

![아키텍처](https://user-images.githubusercontent.com/41244373/131594159-34598568-d2d7-43b8-86a3-ab521bf62e87.png)

## ⚒ CI/CD (추후에 그림 추가하기) 

- `Github Actions`를 활용해서 지속적 통합 및 배포
- `master` 브랜치로 `push`를 하면, test(`$ npm run test`)를 진행하고 테스트를 성공한 경우에만 운영 리소스(`AWS EC2`)에 자동 배포된다.



## 🙋‍♂️ Developer

|                                          Backend                                           |                                         Backend                                          |                                         Backend                                          |                                         Backend                                         |                                        Frontend                                         |                                        Frontend                                         |
| :----------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/56083021?v=4" width=400px alt="제이온"/> | <img src="https://avatars.githubusercontent.com/u/37281119?v=4" width=400px alt="우기"/> | <img src="https://avatars.githubusercontent.com/u/68985748?v=4" width=400px alt="아론"/> | <img src="https://avatars.githubusercontent.com/u/41244373?v=4" width=400px alt="제리"> | <img src="https://avatars.githubusercontent.com/u/42544600?v=4" width=400px alt="도비"> | <img src="https://avatars.githubusercontent.com/u/59409762?v=4" width=400px alt="곤이"> |
|                            [제이온](https://github.com/pjy1368)                            |                           [우기](https://github.com/jujubebat)                           |                          [아론](https://github.com/Sehwan-Jang)                          |                         [제리](https://github.com/jaeseongDev)                          |                           [도비](https://github.com/zereight)                           |                          [곤이](https://github.com/yungo1846)                           |
