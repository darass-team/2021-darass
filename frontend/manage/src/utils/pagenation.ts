export const getPagesOfLength5 = (currentPageIndex: number, maxPageLength: number) => {
  let start = currentPageIndex - 2;
  let end = currentPageIndex + 2;

  if (end > maxPageLength) {
    start -= end - maxPageLength;
    end = maxPageLength;
  }

  if (start <= 0) {
    end += (start - 1) * -1;
    start = 1;
  }

  end = end > maxPageLength ? maxPageLength : end;

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};
