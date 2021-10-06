import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { messageFromReplyModule, messageFromReplyModal } from "./../postMessage";

window.MessageChannel = require("worker_threads").MessageChannel;

const port = new MessageChannel().port2;
jest.spyOn(port, "postMessage");

describe("postMessage test", () => {
  describe("messageFromReplyModule test", () => {
    test("setScrollHeight를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModule(port).setScrollHeight();

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.SCROLL_HEIGHT,
        data: document.querySelector("#root")?.scrollHeight
      });
    });
    test("openAlert를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModule(port).openAlert("message");

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.MODAL.OPEN.ALERT,
        data: "message"
      });
    });

    test("openAlert를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModule(port).openConfirmModal("message");

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.MODAL.OPEN.CONFIRM,
        data: "message"
      });
    });
    test("openAlarmModal를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModule(port).openAlarmModal([]);

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.MODAL.OPEN.ALARM,
        data: []
      });
    });
    test("openLikingUserModal를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModule(port).openLikingUserModal([]);

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS,
        data: []
      });
    });
  });

  describe("messageFromReplyModal test", () => {
    test("clickedConfirmNo를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModal(port).clickedConfirmNo();

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.CONFIRM_NO
      });
    });
    test("clickedConfirmOk를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModal(port).clickedConfirmOk();

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.CONFIRM_OK
      });
    });
    test("closeAlertModal를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModal(port).closeAlertModal();

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.MODAL.CLOSE.ALERT
      });
    });
    test("closeConfirmModal를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModal(port).closeConfirmModal();

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.MODAL.CLOSE.CONFIRM
      });
    });
    test("closeAlarmModal를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModal(port).closeAlarmModal();

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.MODAL.CLOSE.ALARM
      });
    });
    test("closeLikingUserModal를 호출하면, postMessage가 호출된다.", () => {
      messageFromReplyModal(port).closeLikingUserModal();

      expect(port.postMessage).toHaveBeenCalledWith({
        type: POST_MESSAGE_TYPE.MODAL.CLOSE.LIKING_USERS
      });
    });
  });
});
