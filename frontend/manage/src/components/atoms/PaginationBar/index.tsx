import { Container, PageIndex, PageIndexMoveButton, PageIndexWrapper } from "./styles";

export interface Props {
  setCurrentPageIndex: (index: number) => void;
  totalPageLength: number;
  currentPageIndex: number;
  paginationNumbers: number[];
}

const PaginationBar = ({ setCurrentPageIndex, totalPageLength, currentPageIndex, paginationNumbers }: Props) => {
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

  return (
    <Container>
      <PageIndexMoveButton onClick={movePrevPage} disabled={currentPageIndex === 1}>
        &#8249;
      </PageIndexMoveButton>
      <PageIndexWrapper>
        {paginationNumbers.map(num => (
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

export default PaginationBar;
