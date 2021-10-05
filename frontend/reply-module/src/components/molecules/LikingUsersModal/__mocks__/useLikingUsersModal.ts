import { socialLoginUser } from "@/__test__/fixture/user";
export const useLikingUsersModal = jest.fn().mockImplementation(() => {
  return { isOpen: true, data: [socialLoginUser], setData: jest.fn(), openModal: jest.fn(), onCloseModal: jest.fn() };
});
