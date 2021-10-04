import { Story } from "@storybook/react";
import SubComment, { Props } from "..";

export default {
  title: "organism/SubComment",
  component: SubComment,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <SubComment {...args} />;

export const Default = Template.bind({});

Default.args = {};
