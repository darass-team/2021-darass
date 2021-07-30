export const focusContentEditableTextToEnd = (element: HTMLElement) => {
  const selection = window.getSelection();
  const newRange = document.createRange();
  newRange.setStart(element, 1);
  newRange.setEnd(element, 1);
  selection?.removeAllRanges();
  selection?.addRange(newRange);
};
