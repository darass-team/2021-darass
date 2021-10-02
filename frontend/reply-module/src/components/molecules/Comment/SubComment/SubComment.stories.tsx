import { Story } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "react-query";
import SubComment, { Props } from ".";

export default {
  title: "molecules/SubComment",
  component: SubComment,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <SubComment {...args} />;

export const Default = Template.bind({});

Default.args = {};
