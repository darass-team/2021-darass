export const customAxios = {
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn().mockImplementation(() => {
    return true;
  })
};

export const axiosBearerOption = {
  setAccessToken: jest.fn(),
  clear: jest.fn()
};
