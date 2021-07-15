import { Story } from "@storybook/react";
import ScriptPublishing, { Props } from ".";

export default {
  title: "templates/ScriptPublishing",
  component: ScriptPublishing,
  argTypes: {}
};

const Template: Story<Props> = args => <ScriptPublishing {...args} />;

export const Default = Template.bind({
  projectKey: "프로젝트 키"
});

Default.args = {};
