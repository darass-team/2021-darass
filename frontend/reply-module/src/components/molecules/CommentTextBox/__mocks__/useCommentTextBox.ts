export const useCommentTextBox = jest.fn().mockImplementation(() => {
  return { $contentEditable: null, onInput: jest.fn(), onClickCancelButton: jest.fn(), content: "" };
});
