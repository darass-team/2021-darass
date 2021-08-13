# '배포 환경'에서 Docker를 활용한 실행 방법

> 주의) 밑의 코드로 실행하면 '배포 환경'으로 애플리케이션이 실행되도록 설정되어 있다.  

### 1. Spring Boot를 build 하기

```bash
./gradlew build
```

build를 하면 `build/libs`에 `.jar`파일이 생길 것이다.

### 2. docker-compose.yml을 바탕으로 실행시키기

```bash
docker-compose up --build -d
```

위 명령어를 `docker-compose.yml` 파일이 있는 디렉토리에서 실행시켜야 한다.