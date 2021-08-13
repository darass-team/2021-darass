import { Story } from "@storybook/react";
import GuideStep, { Props } from ".";

export default {
  title: "molecules/GuideStep",
  component: GuideStep,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <GuideStep {...args} />;

export const Default = Template.bind({});

Default.args = {};
