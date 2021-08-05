import { useLocation, useRouteMatch } from "react-router-dom";
import { PROJECT_MENU } from "../../../constants";
import { useCalendar, useCommentList, useCommentPageIndex, useGetAllCommentOfProject } from "../../../hooks";
import ScreenContainer from "../../../styles/ScreenContainer";
import CheckBox from "../../atoms/CheckBox";
import PageNationBar from "../../atoms/PageNationBar";
import Comment from "../../molecules/Comment";
import CommentSearchConditionForm from "../../organisms/CommentSearchConditionForm";
import ContainerWithSideBar from "../../organisms/ContainerWithSideBar";
import { CommentList, Container, DeleteButton, Header, Row, Title } from "./styles";

const Manage = () => {
  const match = useRouteMatch<{ id: string }>();
  const location = useLocation();

  const projectId = Number(match.params.id);
  const urlSearchParams = new URLSearchParams(location.search);
  const pageIndex = urlSearchParams.get("pageIndex") || 1;

  const { comments } = useGetAllCommentOfProject({ projectId });

  const { checkedCommentIds, checkingAllCommentInCurrentPage, updateCheckedCommentId, onToggleCheckingAllComments } =
    useCommentList(comments || []);
  const { showCalendar, setShowCalendar, currentDate, setCurrentDate, startDate, setStartDate, endDate, setEndDate } =
    useCalendar();
  const { currentPageIndex, setCurrentPageIndex } = useCommentPageIndex({
    initialPageIndex: Number(pageIndex),
    projectId
  });

  return (
    <ScreenContainer>
      <ContainerWithSideBar menus={PROJECT_MENU.get(projectId)}>
        <Container>
          <Title>댓글 관리</Title>
          <CommentSearchConditionForm
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          <CommentList>
            <Header>
              <CheckBox
                isChecked={checkingAllCommentInCurrentPage}
                onChange={onToggleCheckingAllComments}
                labelText="모두 선택"
              />

              <DeleteButton>삭제</DeleteButton>
            </Header>

            {comments.map(({ id, content, user, createdDate }) => (
              <Row key={id}>
                <Comment
                  isChecked={checkedCommentIds.some(_id => _id === id)}
                  onChangeCheckBox={() => updateCheckedCommentId(id)}
                  authorProfileImageUrl={user.profileImageUrl}
                  authorNickName={user.nickName}
                  createdDate={createdDate}
                  content={content}
                />
              </Row>
            ))}

            <Row>
              <PageNationBar
                currentPageIndex={currentPageIndex}
                setCurrentPageIndex={setCurrentPageIndex}
                totalDataLength={comments.length}
              />
            </Row>
          </CommentList>
        </Container>
      </ContainerWithSideBar>
    </ScreenContainer>
  );
};

export default Manage;
