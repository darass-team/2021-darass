import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { PROJECT_MENU, ROUTE } from "../../../constants";
import { useGetAllCommentOfProject } from "../../../hooks";
import ScreenContainer from "../../../styles/ScreenContainer";
import { Comment } from "../../../types/comment";
import CheckBox from "../../atoms/CheckBox";
import Modal from "../../atoms/Modal";
import PageNationBar from "../../atoms/PageNationBar";
import Calendar from "../../molecules/Calendar";
import ContainerWithSideBar from "../../organisms/ContainerWithSideBar";
import {
  Avatar,
  CommentList,
  Container,
  Content,
  ContentMeta,
  ContentWrapper,
  Date,
  DateInputText,
  DateInputWrapper,
  DeleteButton,
  Header,
  Name,
  Row,
  SearchButton,
  SearchCondition,
  SearchTermInput,
  SearchTermInputWrapper,
  Title,
  Url
} from "./styles";

const Manage = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const location = useLocation();

  const projectId = Number(match.params.id);

  const urlSearchParams = new URLSearchParams(location.search);
  const pageIndex = urlSearchParams.get("pageIndex") || 1;

  const { comments } = useGetAllCommentOfProject({ projectId });
  const [checkedCommentIds, setCheckedCommentIds] = useState<Comment["id"][]>([]);
  const [checkingAllCommentInCurrentPage, setCheckingAllCommentInCurrentPage] = useState<boolean>(false);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(Number(pageIndex));

  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState<moment.Moment>(() => moment());
  const [startDate, setStartDate] = useState<moment.Moment | null>(currentDate);
  const [endDate, setEndDate] = useState<moment.Moment | null>(currentDate);

  const updateCheckedCommentId = (commentId: Comment["id"]) => {
    const targetIndex = checkedCommentIds.findIndex(id => id === commentId);

    if (targetIndex !== -1) {
      setCheckedCommentIds(ids => ids.filter(id => id !== commentId));
    } else {
      setCheckedCommentIds(ids => ids.concat(commentId));
    }
  };

  const onChangeCheckingAllCommentsInput = () => {
    setCheckingAllCommentInCurrentPage(state => !state);
  };

  useEffect(() => {
    if (checkingAllCommentInCurrentPage) {
      setCheckedCommentIds(comments.map(({ id }) => id));
    } else {
      setCheckedCommentIds([]);
    }
  }, [checkingAllCommentInCurrentPage]);

  useEffect(() => {
    history.push(`${ROUTE.GET_PROJECT_MANAGE(projectId)}?pageIndex=${currentPageIndex}`);
  }, [currentPageIndex]);

  return (
    <ScreenContainer>
      <ContainerWithSideBar menus={PROJECT_MENU.get(projectId)}>
        <Container>
          <Title>프로젝트 관리</Title>
          <CommentList>
            <SearchCondition>
              <DateInputWrapper>
                <span>기간 선택</span>
                <DateInputText onClick={() => setShowCalendar(state => !state)}>
                  {startDate?.format("YY-MM-DD")}
                </DateInputText>
                <span>~</span>
                <DateInputText onClick={() => setShowCalendar(state => !state)}>
                  {endDate?.format("YY-MM-DD")}
                </DateInputText>
              </DateInputWrapper>

              <SearchTermInputWrapper>
                <label>
                  <span>내용 검색</span>
                  <SearchTermInput placeholder="검색어를 입력해주세요." />
                </label>
              </SearchTermInputWrapper>

              <SearchButton>조회</SearchButton>

              <Modal isOpen={showCalendar} closeModal={() => setShowCalendar(false)}>
                <Calendar
                  date={currentDate}
                  setDate={setCurrentDate}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
              </Modal>
            </SearchCondition>
            <Header>
              <CheckBox
                isChecked={checkingAllCommentInCurrentPage}
                onChange={onChangeCheckingAllCommentsInput}
                labelText="모두 선택"
              />

              <DeleteButton>삭제</DeleteButton>
            </Header>

            {comments.map(({ id, content, user, createdDate }) => (
              <Row key={id}>
                <CheckBox
                  isChecked={checkedCommentIds.some(_id => _id === id)}
                  onChange={() => updateCheckedCommentId(id)}
                />
                <Avatar imageURL={user.profileImageUrl} />
                <ContentWrapper>
                  <ContentMeta>
                    <Name>{user.nickName}</Name>
                    <Date>{createdDate}</Date>
                  </ContentMeta>
                  <Content>{content}</Content>
                  <Url>www.naver.com</Url>
                </ContentWrapper>
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
