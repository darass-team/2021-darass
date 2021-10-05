export const useCommentOption = jest.fn().mockImplementation(() => {
  return {
    isShowOptionBox: false,
    onToggleOptionBox: jest.fn(),
    onCloseModal: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn()
  };
});
