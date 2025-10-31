export interface Message {
  _id: number;
  role: "user" | "assistant";
  content: string;
  userId?: number;
}
