import { Story } from "@storybook/react";
import TypingText, { Props } from ".";

export default {
  title: "atoms/TypingText",
  component: TypingText,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <TypingText {...args} />;

export const Default = Template.bind({});

Default.args = {
  texts: ["01234", "안녕하세요", "반갑습니다."]
};
