import ScreenContainer from "@/components/@style/ScreenContainer";
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
  useDocumentTitle,
  useGetCommentsOfProjectPerPage,
  useGetProject,
  useInput
} from "@/hooks";
import { useUserContext } from "@/hooks/context/useUserContext";
import { AlertError } from "@/utils/alertError";
import { getPagesOfLength5 } from "@/utils/pagination";
import { FormEvent, useEffect } from "react";
import { Redirect, useLocation, useRouteMatch } from "react-router-dom";
import { CommentList, CommentsViewer, Container, DeleteButton, Header, Row, Title, TotalComment } from "./styles";
import dayjs from "dayjs";

const Manage = () => {
  const match = useRouteMatch<{ id: string }>();
  const location = useLocation();
  useDocumentTitle("댓글 관리");

  const { user: me } = useUserContext();

  const projectId = Number(match.params.id);
  const urlSearchParams = new URLSearchParams(location.search);
  const pageIndex = urlSearchParams.get("pageIndex") || 1;

  const { value: keyword, onChangeWithMaxLength: onChangeKeyword } = useInput("", MAX_COMMENT_SEARCH_TERM_LENGTH);

  const { showCalendar, setShowCalendar, currentDate, setCurrentDate, startDate, setStartDate, endDate, setEndDate } =
    useCalendar({
      initialStartDate: dayjs().subtract(1, "year"),
      initialEndDate: dayjs()
    });

  const startDateAsString = startDate?.format("YYYY-MM-DD") || dayjs().format("YYYY-MM-DD");
  const endDateAsString = endDate?.format("YYYY-MM-DD") || dayjs().format("YYYY-MM-DD");

  const { project } = useGetProject({
    id: projectId
  });
  const projectSecretKey = project?.secretKey;

  const { deleteComment } = useDeleteComment();

  const { currentPageIndex, setCurrentPageIndex } = useCommentPageIndex({
    initialPageIndex: Number(pageIndex),
    projectId
  });

  const {
    comments,
    totalComment,
    totalPage,
    refetch: getCommentsOfProjectPerPage,
    isFetched: isFetchedGetCommentsOfProjectPerPage
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

    getCommentsOfProjectPerPage();
  }, [currentPageIndex, projectSecretKey, totalPage]);

  if (Number.isNaN(projectId)) {
    return <Redirect to={ROUTE.COMMON.HOME} />;
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

          <CommentsViewer isFetchedGetCommentsOfProjectPerPage={isFetchedGetCommentsOfProjectPerPage}>
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
                comments.map(({ id, content, user, createdDate, url, secret }) => (
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
                      secret={secret}
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
