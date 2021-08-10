import moment from "moment";
import { ChangeEvent, FormEvent } from "react";
import { MAX_COMMENT_SEARCH_TERM_LENGTH } from "../../../constants/validation";
import Modal from "../../atoms/Modal";
import Calendar from "../../molecules/Calendar";
import {
  Container,
  DateInputText,
  DateRange,
  Meta,
  SearchButton,
  SearchTermInput,
  Wrapper,
  SearchTermInputCounter
} from "./styles";

export interface Props {
  onSubmit: (event: FormEvent) => void;
  showCalendar: boolean;
  setShowCalendar: (state: boolean) => void;
  currentDate: moment.Moment;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  setCurrentDate: (state: moment.Moment) => void;
  setStartDate: (state: moment.Moment | null) => void;
  setEndDate: (state: moment.Moment | null) => void;
  onChangeKeyword: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  keyword: string;
}

const CommentSearchConditionForm = ({
  onSubmit,
  showCalendar,
  setShowCalendar,
  currentDate,
  setCurrentDate,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onChangeKeyword,
  keyword
}: Props) => {
  return (
    <>
      <Container onSubmit={onSubmit}>
        <Wrapper>
          <Meta>기간 선택</Meta>
          <DateRange>
            <DateInputText onClick={() => setShowCalendar(true)}>{startDate?.format("YY-MM-DD")}</DateInputText>
            <span>{" ~ "}</span>
            <DateInputText onClick={() => setShowCalendar(true)}>{endDate?.format("YY-MM-DD")}</DateInputText>
          </DateRange>
        </Wrapper>

        <Wrapper>
          <Meta>내용 검색</Meta>
          <SearchTermInput value={keyword} onChange={onChangeKeyword} placeholder="검색어를 입력해주세요." />
        </Wrapper>

        <SearchTermInputCounter>
          {keyword.length} / {MAX_COMMENT_SEARCH_TERM_LENGTH}
        </SearchTermInputCounter>

        <SearchButton>조회</SearchButton>
      </Container>

      <Modal isOpen={showCalendar} closeModal={() => setShowCalendar(false)} dimmedOpacity={0}>
        <Calendar
          date={currentDate}
          setDate={setCurrentDate}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </Modal>
    </>
  );
};

export default CommentSearchConditionForm;
