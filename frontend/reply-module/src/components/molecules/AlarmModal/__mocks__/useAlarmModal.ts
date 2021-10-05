import { alarmContents } from "@/__test__/fixture/alarmContent";

export const useAlarmModal = jest.fn().mockImplementation(() => {
  return { isOpen: true, data: alarmContents, setData: jest.fn(), openModal: jest.fn(), onCloseModal: jest.fn() };
});
