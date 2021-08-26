import { Story } from "@storybook/react";
import ContainerWithSideBar, { Props } from ".";

export default {
  title: "organisms/ContainerWithSideBar",
  component: ContainerWithSideBar,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <ContainerWithSideBar {...args} />;

export const Default = Template.bind({});

Default.args = {};
