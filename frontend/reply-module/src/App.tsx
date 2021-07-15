import CommentPage from "./components/pages/CommentPage";

const App = () => {
  const urlParams = new URLSearchParams(window.location.search);

  return (
    <>
      <h2>현재주소: {urlParams.get("url")}</h2>
      <h2>액세스 토큰: {urlParams.get("accessToken")}</h2>
      <CommentPage />
    </>
  );
};

export default App;
