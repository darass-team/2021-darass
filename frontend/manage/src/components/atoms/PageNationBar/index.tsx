import { COMMENT_COUNT_PER_PAGE } from "../../../constants/pagenation";
import { Container, PageIndex } from "./styles";

export interface Props {
  setCurrentPageIndex: (index: number) => void;
  totalDataLength: number;
  currentPageIndex: number;
  numOfContentPerPage?: number;
}

const PageNationBar = ({
  setCurrentPageIndex,
  totalDataLength,
  numOfContentPerPage = COMMENT_COUNT_PER_PAGE,
  currentPageIndex
}: Props) => {
  const totalPageLength = Math.floor(totalDataLength / numOfContentPerPage) + 1;

  return (
    <Container>
      {Array.from({ length: totalPageLength }, (_, index) => index + 1).map(num => (
        <PageIndex key={num} onClick={() => setCurrentPageIndex(num)} isCurrentPageIndex={currentPageIndex === num}>
          {num}
        </PageIndex>
      ))}
    </Container>
  );
};

export default PageNationBar;
