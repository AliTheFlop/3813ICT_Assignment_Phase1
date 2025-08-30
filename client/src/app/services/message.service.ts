import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messagesKey: string = 'messages';
  messages: Message[] = [];

  constructor(private storage: StorageService) {
    this.seedInitialMessages();
  }

  private seedInitialMessages(): void {
    const messages = this.storage.load<Message[]>(this.messagesKey);
    if (!messages || messages.length === 0) {
      const initialMessages: Message[] = [
        {
          id: 1,
          content: 'Lollipop',
          groupId: 1,
          channelId: 2,
        },
        {
          id: 2,
          content: 'Popscicle',
          groupId: 1,
          channelId: 2,
        },
        {
          id: 3,
          content: 'John Smith',
          groupId: 1,
          channelId: 2,
        },
      ];

      this.storage.save(this.messagesKey, initialMessages);
    }
  }

  getGroups(): Message[] {
    const messages = this.storage.load<Message[]>(this.messagesKey);
    return messages ? messages : [];
  }
}
