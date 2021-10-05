import LoadingPage from "@/components/organisms/LoadingPage";
import { useOAuth } from "./useOAuth";

const OAuth = () => {
  useOAuth();

  return <LoadingPage />;
};

export default OAuth;
