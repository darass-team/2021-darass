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
  title: "molecules/Comment",
  component: Comment,
  decorators: [(story: any) => <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>],
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <Comment {...args} />;

export const Default = Template.bind({});

Default.args = {
  comment: {
    id: 1,
    likingUsers: [],
    content:
      "Donec accumsan neque enim sodales. Neque eget vulputate viverra convallis pharetra.1234142151251235123513412412",
    user: {
      id: 1,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      createdDate: new Date().toLocaleDateString(),
      modifiedDate: new Date().toLocaleDateString(),
      type: "SocialLoginUser"
    },
    createdDate: new Date().toLocaleDateString(),
    modifiedDate: new Date().toLocaleDateString()
  },
  shouldShowOption: true
};
