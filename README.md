<p align="middle" >
  <img width="200px;" src="https://user-images.githubusercontent.com/41244373/137938733-acdb3852-6514-4c60-9b80-2d9380c05adc.png" alt="darass-logo"/>
</p>
<h1 align="middle">다라쓰</h1>
<h3 align="middle">어디든지 쉽고 간편하게 다는 댓글 모듈 서비스</h3>

<br/>

## 📌 Notice
다라쓰는 현재 프론트엔드 저장소와 백엔드 저장소가 분리되어 있어요.  
해당 저장소는 홍보용으로 자세한 코드는 [darass-team](https://github.com/darass-team)를 참고해 주세요!

## 📝 Introduce

다라쓰는 스크립트 코드를 웹 페이지에 붙여넣는 것만으로 간편하게 댓글 기능을 추가할 수 있는 댓글 모듈 서비스 입니다.

사용자에게 필요한 댓글 기능과 함께 운영에 필요한 댓글 통계 및 관리 기능도 제공합니다.

## 🐤 Demo
- [다라쓰 체험해보기](https://woowacourse-darass.tistory.com/1)

- [다라쓰 시작하기](https://darass.co.kr)


## ⭐ Main Feature
- 웹 페이지에 서비스에서 제공하는 스크립트 코드를 추가하면, 댓글 모듈이 추가되는 기능
- 관리자 페이지에서 댓글 통계를 확인하고 댓글을 관리할 수 있는 기능
- oauth2 로그인 / 로그아웃 기능


## 🔧 Stack

**Frontend(Web)**
- **Language** : TypeScript
- **Library & Framework** : React, Styled-Components, Webpack, Babel
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
- **CI/CD** : Github Actions

## 🔨 Front-End Architecture
![아키텍처](https://user-images.githubusercontent.com/42544600/134909775-cd4d3ab7-6181-4356-8392-097cee0467dd.png)

## 🔨 Back-End Architecture
![아키텍처](https://user-images.githubusercontent.com/56083021/152636238-fd6c19b1-d7ee-4821-98d4-f3d9acced031.png)


## 🔨 CI / CD Flow
![CI / CD Flow](https://user-images.githubusercontent.com/56083021/152636306-da0554bb-434e-4908-a971-e064597df691.png)

1. main 브랜치에서 feature 브랜치를 딴 후 기능을 개발한다. 
(단, feature 브랜치는 하루 안에 사라져야 한다.)
2. feature 브랜치에서 main 브랜치로 PR을 날린다.
    1. Github Actions에서 테스트를 포함한 빌드가 수행된다.
    2. Jacoco가 최소 테스트 커버리지를 만족하는지 검사한다.
    3. 소나 큐브가 정적 코드 분석을 한다.
    4. 코드 리뷰를 반영한다.
3. PR을 main 브랜치에 merge한다.
    1. 개발 서버로 자동 배포가 된다.
    2. 개발 서버를 기준으로 QA를 진행한다.
4. 빠른 시간 안에 운영 서버로 수동 배포한다.


## 🙋‍♂️ Developer

|                                          Backend                                           |                                         Backend                                          |                                         Backend                                          |                                         Backend                                         |                                        Frontend                                         |                                        Frontend                                         |
| :----------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/56083021?v=4" width=400px alt="제이온"/> | <img src="https://avatars.githubusercontent.com/u/37281119?v=4" width=400px alt="우기"/> | <img src="https://avatars.githubusercontent.com/u/68985748?v=4" width=400px alt="아론"/> | <img src="https://avatars.githubusercontent.com/u/41244373?v=4" width=400px alt="제리"> | <img src="https://avatars.githubusercontent.com/u/42544600?v=4" width=400px alt="도비"> | <img src="https://avatars.githubusercontent.com/u/59409762?v=4" width=400px alt="곤이"> |
|                            [제이온](https://github.com/pjy1368)                            |                           [우기](https://github.com/jujubebat)                           |                          [아론](https://github.com/Sehwan-Jang)                          |                         [제리](https://github.com/jaeseongDev)                          |                           [도비](https://github.com/zereight)                           |                          [곤이](https://github.com/yungo1846)                           |
