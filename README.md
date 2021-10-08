<p align="middle" >
  <img width="200px;" src="https://github.com/woowacourse-teams/2021-darass/blob/main/frontend/reply-module/src/assets/svg/darass-logo.svg" alt="darass-logo"/>
</p>
<h1 align="middle">다라쓰</h1>
<h3 align="middle">어디든지 쉽고 간편하게 다는 댓글 모듈 서비스</h3>

<br/>


# 📝 Introduce

- 다라쓰는 댓글 모듈을 제공하는 서비스입니다.
- 간단한 html 스크립트를 내 사이트에 붙여 넣기만 하면, 댓글 모듈이 추가됩니다! 
- 소셜 로그인 기능, 댓글 통계기능, 댓글 실시간 알람 등의 기능도 제공합니다. 


# 🐤 Demo
- 다라쓰 댓글 모듈 체험해보기 
  - [데모 블로그](https://park-back-end.tistory.com/1)
  - [다라쓰 댓글 모듈을 실제 사용중인 블로그](https://steady-coding.tistory.com/487) 
- 다라쓰 시작하기 
  - [https://darass.co.kr](https://darass.co.kr)

<br/>

# ⭐ Main Feature
- 댓글 모듈 기능
  - 자신의 웹 페이지에 추가할 댓글 모듈 스크립트 코드를 발급받는 기능
  - 자신의 웹 페이지에 발급 받은 댓글 모듈 스크립트를 삽입하여 댓글 모듈을 추가하는 기능
- 사용자 로그인 기능
  - 카카오, 네이버 auth 로그인/로그아웃 기능
  - 게스트 로그인 기능(임시 닉네임과 비밀 번호로 로그인 후 댓글 작성)
- 댓글 작성 기능 
  - 댓글 작성 기능 
  - 대댓글 작성 기능 
  - 댓글 좋아요 기능 
  - 웹 페이지 주인에 한해서 댓글을 삭제하는 기능 
- 댓글 관리 기능 
  - 댓글 조회, 삭제 기능 
  - 댓글 통계 조회 기능 
- 실시간 댓글 알람 기능
  - 나의 웹 사이트에 댓글이 달릴 경우, 실시간으로 알림 받는 기능
  - 나의 댓글에 대댓글이 달릴 경우, 실시간으로 알림 받는 기능
  - 나의 댓글에 좋아요가 눌릴 경우, 실시간으로 알림 받는 기능 

# 🔧 Stack

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

# 🔨 Front-End Architecture
![아키텍처](https://user-images.githubusercontent.com/42544600/134909775-cd4d3ab7-6181-4356-8392-097cee0467dd.png)

# 🔨 Back-End Architecture

![아키텍처](https://user-images.githubusercontent.com/41244373/131594159-34598568-d2d7-43b8-86a3-ab521bf62e87.png)

# ⚒ CI/CD (추후에 그림 추가하기) 

- `Github Actions`를 활용해서 지속적 통합 및 배포
- `master` 브랜치로 `push`를 하면, test(`$ npm run test`)를 진행하고 테스트를 성공한 경우에만 운영 리소스(`AWS EC2`)에 자동 배포된다.



# 🙋‍♂️ Developer

|                                          Backend                                           |                                         Backend                                          |                                         Backend                                          |                                         Backend                                         |                                        Frontend                                         |                                        Frontend                                         |
| :----------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/56083021?v=4" width=400px alt="제이온"/> | <img src="https://avatars.githubusercontent.com/u/37281119?v=4" width=400px alt="우기"/> | <img src="https://avatars.githubusercontent.com/u/68985748?v=4" width=400px alt="아론"/> | <img src="https://avatars.githubusercontent.com/u/41244373?v=4" width=400px alt="제리"> | <img src="https://avatars.githubusercontent.com/u/42544600?v=4" width=400px alt="도비"> | <img src="https://avatars.githubusercontent.com/u/59409762?v=4" width=400px alt="곤이"> |
|                            [제이온](https://github.com/pjy1368)                            |                           [우기](https://github.com/jujubebat)                           |                          [아론](https://github.com/Sehwan-Jang)                          |                         [제리](https://github.com/jaeseongDev)                          |                           [도비](https://github.com/zereight)                           |                          [곤이](https://github.com/yungo1846)                           |

# 서비스 이미지

## 티스토리 댓글 모듈 적용 예 
![image](https://user-images.githubusercontent.com/37281119/136521221-c97ff851-52e5-42eb-8f92-0ad1c48d88cd.png)

## 소셜 로그인 기능
![image](https://user-images.githubusercontent.com/37281119/136521320-87d1af58-ed67-4586-b32b-50b326adec35.png)   
