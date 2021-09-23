import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ConditionalRoute } from "./components/HOC/ConditionalRoute";
import Nav from "./components/organisms/Nav";
import About from "./components/pages/About";
import ErrorPage from "./components/pages/ErrorPage";
import {
  LoadableHome,
  LoadableManage,
  LoadableMyProject,
  LoadableNewProject,
  LoadableProjectDetail,
  LoadableScriptPublishing,
  LoadableStatistics,
  LoadableUserProfile
} from "./components/pages/Loadable";
import Login from "./components/pages/Login";
import OAuth from "./components/pages/OAuth";
import { BASE_URL, ROUTE } from "./constants";
import { useUser } from "./hooks";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const App = () => {
  const { user, isLoading } = useUser();

  useEffect(() => {
    LoadableHome.preload();
  }, []);

  useEffect(() => {
    if (!user) return;

    const socket = new SockJS(`${BASE_URL}/websocket`);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      console.log("소켓연결 성공");
      stompClient.subscribe(`/queue/main${user.id}`, payload => {
        console.log(`관리자 페이지에서 메시지를 받음 => ${payload}`);
      });
    });

    // id가 20인 유저가 실시간 알림을 받는 예제 코드
    // var socket= new SockJS('https://dev-api.darass.co.kr/websocket'); // 웹 소켓 연결을 위한 객체를 만든다.
    // stompClient = Stomp.over(socket);
    // stompClient.connect({}, connectionSuccess); // 웹 소켓 연결 시작. 연결이 성공했을 경우 콜백 함수를 넣어준다.
    // function connectionSuccess() {
    //   stompClient.subscribe('/queue/main20', onMessageReceived); // 관리자 페이지용
    //   stompClient.subscribe('/queue/module20', onMessageReceived); // 댓글 모듈용
    // }
    // function onMessageReceived(payload) {
    // }
  }, [user]);

  return (
    <>
      <Nav />
      <Sentry.ErrorBoundary fallback={<ErrorPage notice="에러가 발생했습니다." />}>
        <Switch>
          <Route exact path={ROUTE.COMMON.HOME} component={LoadableHome} />
          <Route exact path={ROUTE.COMMON.ABOUT} component={About} />
          <Route exact path={ROUTE.COMMON.NOTICE} render={() => <ErrorPage notice="개발중인 페이지 입니다." />} />
          <ConditionalRoute
            exact
            path={ROUTE.NON_AUTHORIZED.OAUTH}
            component={OAuth}
            condition={!user}
            redirectPath={ROUTE.AUTHORIZED.MY_PROJECT}
          />
          <ConditionalRoute
            path={ROUTE.NON_AUTHORIZED.LOGIN}
            component={Login}
            condition={!user}
            redirectPath={ROUTE.AUTHORIZED.MY_PROJECT}
          />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.USER_PROFILE}
            component={LoadableUserProfile}
            condition={!!user || isLoading}
          />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.SCRIPT_PUBLISHING}
            component={LoadableScriptPublishing}
            condition={!!user || isLoading}
          />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.NEW_PROJECT}
            component={LoadableNewProject}
            condition={!!user || isLoading}
          />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.PROJECT_MANAGE}
            component={LoadableManage}
            condition={!!user || isLoading}
          />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.STATISTICS}
            component={LoadableStatistics}
            condition={!!user || isLoading}
          />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.PROJECT_DETAIL}
            component={LoadableProjectDetail}
            condition={!!user || isLoading}
          />
          <ConditionalRoute
            path={ROUTE.AUTHORIZED.MY_PROJECT}
            component={LoadableMyProject}
            condition={!!user || isLoading}
          />

          <Redirect to={ROUTE.COMMON.HOME} />
        </Switch>
      </Sentry.ErrorBoundary>
    </>
  );
};
export default App;
