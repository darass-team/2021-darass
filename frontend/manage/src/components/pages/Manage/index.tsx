import { useLocation, useRouteMatch } from "react-router-dom";
import { PROJECT_MENU } from "../../../constants";
import {
  useCalendar,
  useCommentList,
  useCommentPageIndex,
  useGetAllCommentsOfProject,
  useGetProject
} from "../../../hooks";
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

  const { showCalendar, setShowCalendar, currentDate, setCurrentDate, startDate, setStartDate, endDate, setEndDate } =
    useCalendar();
  const { currentPageIndex, setCurrentPageIndex } = useCommentPageIndex({
    initialPageIndex: Number(pageIndex),
    projectId
  });

  const { project } = useGetProject(projectId);
  const projectSecretKey = project?.secretKey;

  const { comments } = useGetAllCommentsOfProject({
    projectId,
    sortOption: "latest",
    projectKey: projectSecretKey || "",
    startDate: startDate?.format("YYYY-MM-DD") || null,
    endDate: endDate?.format("YYYY-MM-DD") || null,
    page: currentPageIndex,
    size: 5
  });

  const {
    checkedCommentIds,
    isCheckingAllCommentsInCurrentPage,
    updateCheckedCommentId,
    onToggleIsCheckingAllComments
  } = useCommentList(comments || []);

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
                isChecked={isCheckingAllCommentsInCurrentPage}
                onChange={onToggleIsCheckingAllComments}
                labelText="모두 선택"
              />

              <DeleteButton>삭제</DeleteButton>
            </Header>

            {comments?.map(({ id, content, user, createdDate, url }) => (
              <Row key={id}>
                <Comment
                  isChecked={checkedCommentIds.some(_id => _id === id)}
                  onChangeCheckBox={() => updateCheckedCommentId(id)}
                  authorProfileImageUrl={user.profileImageUrl}
                  authorNickName={user.nickName}
                  createdDate={createdDate}
                  content={content}
                  url={url}
                />
              </Row>
            ))}

            <Row>
              <PageNationBar
                currentPageIndex={currentPageIndex}
                setCurrentPageIndex={setCurrentPageIndex}
                totalDataLength={comments?.length || 0}
              />
            </Row>
          </CommentList>
        </Container>
      </ContainerWithSideBar>
    </ScreenContainer>
  );
};

export default Manage;
