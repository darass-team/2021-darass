export interface Comment {
  id: number;
  content: string;
  user: {
    id: number;
    imageURL: string;
    nickName: string;
    type: string;
  };
  createdAt: string;
}
