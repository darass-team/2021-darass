import { Story } from "@storybook/react";
import Tooltip, { Props } from ".";

export default {
  title: "atoms/Tooltip",
  component: Tooltip,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <Tooltip {...args} />;

export const Default = Template.bind({});

Default.args = {
  text: "프로젝트란? 어쩌구 저쩌구프로젝트란? 어쩌구 저쩌구프로젝트란? 어쩌구 저쩌구프로젝트란? 어쩌구 저쩌구프로젝트란? 어쩌구 저쩌구프로젝트란? 어쩌구 저쩌구프로젝트란? 어쩌구 저쩌구프로젝트란? 어쩌구 저쩌구프로젝트란? 어쩌구 저쩌구프로젝트란? 어쩌구 저쩌구"
};
