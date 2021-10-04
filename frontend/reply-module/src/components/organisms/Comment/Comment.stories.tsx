import { Story } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Comment, { Props } from ".";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export default {
  title: "organism/Comment",
  component: Comment,
  decorators: [(story: any) => <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>],
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <Comment {...args} />;

export const Default = Template.bind({});

Default.args = {};
