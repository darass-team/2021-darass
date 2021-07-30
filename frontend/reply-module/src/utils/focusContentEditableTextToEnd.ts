export const focusContentEditableTextToEnd = (element: HTMLElement) => {
  if (element.innerText.length === 0) {
    element.focus();

    return;
  }

  const selection = window.getSelection();
  const newRange = document.createRange();
  newRange.setStart(element, 1);
  newRange.setEnd(element, 1);
  selection?.removeAllRanges();
  selection?.addRange(newRange);
};
