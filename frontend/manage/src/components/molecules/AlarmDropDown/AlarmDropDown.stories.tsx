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
      user: socialLoginUser2,
      url: "www.naver.com",
      content: "안녕하세요",
      time: new Date().toDateString(),
      category: "NewComment",
      hasBeenRead: true
    },
    {
      user: socialLoginUser2,
      url: "www.naver.com",
      content:
        "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
      time: new Date().toDateString(),
      category: "ReplyComment",
      hasBeenRead: false
    },
    {
      user: socialLoginUser2,
      url: "www.naver.com",
      content:
        "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
      time: new Date().toDateString(),
      category: "ReplyComment",
      hasBeenRead: false
    }
  ]
};
