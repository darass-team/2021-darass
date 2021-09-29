import CheckBox from "@/components/atoms/CheckBox";
import PaginationBar from "@/components/atoms/PaginationBar";
import Comment from "@/components/molecules/Comment";
import CommentSearchConditionForm from "@/components/organisms/CommentSearchConditionForm";
import ContainerWithSideBar from "@/components/organisms/ContainerWithSideBar";
import ErrorNotice from "@/components/organisms/ErrorNotice";
import { PROJECT_MENU, ROUTE } from "@/constants";
import { COMMENT_COUNT_PER_PAGE } from "@/constants/pagination";
import { MAX_COMMENT_SEARCH_TERM_LENGTH } from "@/constants/validation";
import {
  useCalendar,
  useCommentList,
  useCommentPageIndex,
  useDeleteComment,
  useGetCommentsOfProjectPerPage,
  useGetProject,
  useInput,
  useUser
} from "@/hooks";
import ScreenContainer from "@/components/@style/ScreenContainer";
import { AlertError } from "@/utils/alertError";
import { getPagesOfLength5 } from "@/utils/pagination";
import moment from "moment";
import { FormEvent, useEffect } from "react";
import { useLocation, useRouteMatch, Redirect } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import { CommentList, CommentsViewer, Container, DeleteButton, Header, Row, Title, TotalComment } from "./styles";

const Manage = () => {
  const match = useRouteMatch<{ id: string }>();
  const location = useLocation();

  const { user: me, isSuccess: isSuccessGetUser } = useUser();

  const projectId = Number(match.params.id);
  const urlSearchParams = new URLSearchParams(location.search);
  const pageIndex = urlSearchParams.get("pageIndex") || 1;

  const { value: keyword, onChangeWithMaxLength: onChangeKeyword } = useInput("", MAX_COMMENT_SEARCH_TERM_LENGTH);

  const { showCalendar, setShowCalendar, currentDate, setCurrentDate, startDate, setStartDate, endDate, setEndDate } =
    useCalendar({
      initialStartDate: moment().subtract(1, "year"),
      initialEndDate: moment()
    });

  const startDateAsString = startDate?.format("YYYY-MM-DD") || moment().format("YYYY-MM-DD");
  const endDateAsString = endDate?.format("YYYY-MM-DD") || moment().format("YYYY-MM-DD");

  const { project, isSuccess: isSuccessGetProject } = useGetProject(projectId);
  const projectSecretKey = project?.secretKey;

  const { deleteComment } = useDeleteComment({ projectKey: projectSecretKey, page: Number(pageIndex) });

  const { currentPageIndex, setCurrentPageIndex } = useCommentPageIndex({
    initialPageIndex: Number(pageIndex),
    projectId
  });

  const {
    comments,
    totalComment,
    totalPage,
    refetch: getCommentsOfProjectPerPage,
    prefetch: preGetCommentsOfProjectPerPage,
    isSuccess: isSuccessGetCommentsOfProjectPerPage
  } = useGetCommentsOfProjectPerPage({
    projectKey: projectSecretKey,
    startDate: startDateAsString,
    endDate: endDateAsString,
    page: currentPageIndex,
    size: COMMENT_COUNT_PER_PAGE,
    keyword
  });

  const {
    checkedCommentIds,
    setCheckedCommentIds,
    setIsCheckingAllCommentsInCurrentPage,
    isCheckingAllCommentsInCurrentPage,
    updateCheckedCommentId,
    onToggleIsCheckingAllComments
  } = useCommentList(comments || []);

  const paginationNumbers = getPagesOfLength5(currentPageIndex, totalPage);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    getCommentsOfProjectPerPage();

    setCurrentPageIndex(1);
  };

  const onClickDeleteButton = async () => {
    if (checkedCommentIds.length === 0) {
      alert("삭제할 댓글이 없습니다.");

      return;
    }

    try {
      const deleteAllComments = checkedCommentIds.map(id => {
        return deleteComment({ id });
      });

      await Promise.allSettled(deleteAllComments);

      getCommentsOfProjectPerPage();

      setIsCheckingAllCommentsInCurrentPage(false);
      setCheckedCommentIds([]);
      alert("댓글이 정상적으로 삭제되었습니다.");
    } catch (error) {
      if (error instanceof AlertError) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    if (!currentPageIndex || !projectSecretKey) return;
    (async () => {
      await getCommentsOfProjectPerPage();

      Promise.allSettled(paginationNumbers.map(num => preGetCommentsOfProjectPerPage(num))).catch(error => {
        if (error instanceof AlertError) {
          alert(error.message);
        }
      });
    })();
  }, [currentPageIndex, projectSecretKey, totalPage]);

  if (Number.isNaN(projectId)) {
    return <Redirect to={ROUTE.COMMON.HOME} />;
  }

  if (!project || !me || !comments) {
    return <LoadingPage />;
  }

  return (
    <ScreenContainer>
      <ContainerWithSideBar menus={PROJECT_MENU.getByProjectId(projectId)}>
        <Container>
          <Title>댓글 관리</Title>
          <CommentSearchConditionForm
            onSubmit={onSubmit}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            onChangeKeyword={onChangeKeyword}
            keyword={keyword}
          />

          <CommentsViewer>
            <TotalComment>
              <span>{totalComment}</span>
              개의 댓글 (<span>총 {totalPage} 페이지</span>)
            </TotalComment>
            <Header>
              <CheckBox
                isChecked={isCheckingAllCommentsInCurrentPage}
                onChange={onToggleIsCheckingAllComments}
                labelText="모두 선택"
              />

              <DeleteButton onClick={onClickDeleteButton}>삭제</DeleteButton>
            </Header>
            <CommentList>
              {comments.length === 0 ? (
                <Row>
                  <ErrorNotice>{"조건에 맞는 댓글을 찾을 수 없습니다"}</ErrorNotice>
                </Row>
              ) : (
                comments.map(({ id, content, user, createdDate, url }) => (
                  <Row key={id}>
                    <Comment
                      isMyComment={me?.id === user.id}
                      isChecked={checkedCommentIds.some(_id => _id === id)}
                      onChangeCheckBox={() => updateCheckedCommentId(id)}
                      authorProfileImageUrl={user.profileImageUrl}
                      authorNickName={user.nickName}
                      createdDate={createdDate}
                      content={content}
                      url={url}
                    />
                  </Row>
                ))
              )}
            </CommentList>

            {comments.length > 0 && (
              <PaginationBar
                currentPageIndex={currentPageIndex}
                setCurrentPageIndex={setCurrentPageIndex}
                paginationNumbers={paginationNumbers}
                totalPageLength={totalPage}
              />
            )}
          </CommentsViewer>
        </Container>
      </ContainerWithSideBar>
    </ScreenContainer>
  );
};

export default Manage;
