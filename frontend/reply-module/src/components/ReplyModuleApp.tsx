import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import LoadingPage from "@/components/organisms/LoadingPage";
import CommentArea from "@/components/pages/CommentArea";
import OAuth from "@/components/pages/OAuth";
import { ROUTE } from "@/constants/route";
import { MessageChannelFromReplyModuleContext } from "@/hooks/contexts/useMessageFromReplyModule";
import { RecentlyAlarmContentContext } from "@/hooks/contexts/useRecentlyAlarmContentContext";
import { useReplyModule } from "./useReplyModuleApp";
import { messageFromReplyModule } from "@/utils/postMessage";

const App = () => {
  const { port, recentlyAlarmContent, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime, receivedMessageFromReplyModal } =
    useReplyModule();

  return (
    <MessageChannelFromReplyModuleContext.Provider
      value={{
        setScrollHeight: messageFromReplyModule(port).setScrollHeight,
        openAlert: messageFromReplyModule(port).openAlert,
        openConfirmModal: messageFromReplyModule(port).openConfirmModal,
        openAlarmModal: messageFromReplyModule(port).openAlarmModal,
        openLikingUserModal: messageFromReplyModule(port).openLikingUserModal,
        receivedMessageFromReplyModal
      }}
    >
      <RecentlyAlarmContentContext.Provider
        value={{ recentlyAlarmContent, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path={ROUTE.HOME} component={port ? CommentArea : LoadingPage} />
            <Route exact path={ROUTE.OAUTH} component={OAuth} />
            <Redirect to={ROUTE.HOME} />
          </Switch>
        </BrowserRouter>
      </RecentlyAlarmContentContext.Provider>
    </MessageChannelFromReplyModuleContext.Provider>
  );
};

export default App;
