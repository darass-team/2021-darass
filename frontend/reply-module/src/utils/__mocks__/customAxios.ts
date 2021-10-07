export const customAxios = jest.fn().mockImplementation(() => {
  return {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn()
  };
});
