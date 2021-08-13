import { Story } from "@storybook/react";
import Days, { Props } from ".";

export default {
  title: "molecules/Days",
  component: Days,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <Days {...args} />;

export const Default = Template.bind({});

Default.args = {};
