import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { messageFromReplyModule, messageFromReplyModal } from "./../postMessage";

const port = {
  postMessage: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  start: jest.fn()
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("postMessage test", () => {
  describe("messageFromReplyModule test", () => {
    test("setScrollHeight를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModule(port as unknown as MessagePort).setScrollHeight();

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.SCROLL_HEIGHT,
        data: Number(document.querySelector("#root")?.scrollHeight)
      });
    });
    test("openAlert를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModule(port as unknown as MessagePort).openAlert("message");

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.MODAL.OPEN.ALERT,
        data: "message"
      });
    });

    test("openConfirmModal를 호출하면, postMessage가 호출된다.", async () => {
      try {
        messageFromReplyModule(port as unknown as MessagePort).openConfirmModal("message");
      } catch (error) {}

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.MODAL.OPEN.CONFIRM,
        data: "message"
      });
    });
    test("openAlarmModal를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModule(port as unknown as MessagePort).openAlarmModal([]);

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.MODAL.OPEN.ALARM,
        data: []
      });
    });
    test("openLikingUserModal를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModule(port as unknown as MessagePort).openLikingUserModal([]);

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS,
        data: []
      });
    });
  });

  describe("messageFromReplyModal test", () => {
    test("clickedConfirmNo를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModal(port as unknown as MessagePort).clickedConfirmNo();

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.CONFIRM_NO
      });
    });
    test("clickedConfirmOk를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModal(port as unknown as MessagePort).clickedConfirmOk();

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.CONFIRM_OK
      });
    });
    test("closeAlertModal를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModal(port as unknown as MessagePort).closeAlertModal();

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.MODAL.CLOSE.ALERT
      });
    });
    test("closeConfirmModal를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModal(port as unknown as MessagePort).closeConfirmModal();

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.MODAL.CLOSE.CONFIRM
      });
    });
    test("closeAlarmModal를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModal(port as unknown as MessagePort).closeAlarmModal();

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.MODAL.CLOSE.ALARM
      });
    });
    test("closeLikingUserModal를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModal(port as unknown as MessagePort).closeLikingUserModal();

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.MODAL.CLOSE.LIKING_USERS
      });
    });
  });
});
