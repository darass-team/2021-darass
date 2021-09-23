import { socialLoginUser2 } from "@/__test__/fixture/user";
import { Story } from "@storybook/react";
import AlarmDropDown, { Props } from ".";

export default {
  title: "molecules/AlarmDropDown",
  component: AlarmDropDown,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <AlarmDropDown {...args} />;

export const Default = Template.bind({});

Default.args = {
  alarmContents: [
    {
      sender: socialLoginUser2.nickName,
      url: "www.naver.com",
      content: "안녕하세요",
      createDate: new Date().toDateString(),
      alarmMessageType: "CREATE_COMMENT",
      hasBeenRead: true
    },
    {
      sender: socialLoginUser2.nickName,
      url: "www.naver.com",
      content:
        "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
      createDate: new Date().toDateString(),
      alarmMessageType: "CREATE_SUB_COMMENT",
      hasBeenRead: false
    },
    {
      sender: socialLoginUser2.nickName,
      url: "www.naver.com",
      content:
        "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
      createDate: new Date().toDateString(),
      alarmMessageType: "CREATE_COMMENT_LIKE",
      hasBeenRead: false
    }
  ]
};
