import { COMMENT_COUNT_PER_PAGE } from "../../../constants/pagination";
import { getPagesOfLength5 } from "../../../utils/pagination";
import { Container, PageIndexWrapper, PageIndex, PageIndexMoveButton } from "./styles";

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

  const movePrevPage = () => {
    if (currentPageIndex > 1) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const moveNextPage = () => {
    if (currentPageIndex < totalPageLength) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const pageNationNumbers = getPagesOfLength5(currentPageIndex, totalPageLength);

  return (
    <Container>
      <PageIndexMoveButton onClick={movePrevPage} disabled={currentPageIndex === 1}>
        &#8249;
      </PageIndexMoveButton>
      <PageIndexWrapper>
        {pageNationNumbers.map(num => (
          <PageIndex key={num} onClick={() => setCurrentPageIndex(num)} isCurrentPageIndex={currentPageIndex === num}>
            {num}
          </PageIndex>
        ))}
      </PageIndexWrapper>
      <PageIndexMoveButton onClick={moveNextPage} disabled={currentPageIndex === totalPageLength}>
        &#8250;
      </PageIndexMoveButton>
    </Container>
  );
};

export default PageNationBar;
