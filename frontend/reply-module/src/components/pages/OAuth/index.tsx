import LoadingPage from "@/components/@molecules/LoadingPage";
import { useOAuth } from "./useOAuth";

const OAuth = () => {
  useOAuth();

  return <LoadingPage />;
};

export default OAuth;
