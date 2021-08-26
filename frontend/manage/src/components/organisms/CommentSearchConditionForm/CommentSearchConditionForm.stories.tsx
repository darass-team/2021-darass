import { Story } from "@storybook/react";
import CommentSearchConditionForm, { Props } from ".";

export default {
  title: "organisms/CommentSearchConditionForm",
  component: CommentSearchConditionForm,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <CommentSearchConditionForm {...args} />;

export const Default = Template.bind({});

Default.args = {};
