import CommentPage from "./components/pages/CommentPage";

const App = () => {
  const urlParams = new URLSearchParams(window.location.search);

  return (
    <>
      <h2>현재주소: {urlParams.get("url")}</h2>
      <h2>프로젝트 키: {urlParams.get("projectKey")}</h2>
      <CommentPage />
    </>
  );
};

export default App;
