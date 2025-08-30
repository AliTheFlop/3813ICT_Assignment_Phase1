export interface Message {
  id: string | number;
  authorName: string;
  avatarUrl?: string;
  text: string;
  createdAt: Date | string;
  isMine: boolean; // true = align right, primary bubble
  edited?: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
}
