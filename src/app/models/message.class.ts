export interface Message {
  id: number;
  message: string;
  messageTime: string;
  fromUserId: number;
  toUserId: number;
  username?: string;
  image?: string;
}
export interface MessageUsers {
  fromUserId: number;
  toUserId: number;
}
