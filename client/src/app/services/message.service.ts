import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { StorageService } from './storage.service';
import { dummyMessages } from '../models/message.model';

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
      const initialMessages: Message[] = dummyMessages;

      this.storage.save(this.messagesKey, initialMessages);
    }
  }

  getMessages(): Message[] {
    const messages = this.storage.load<Message[]>(this.messagesKey);
    return messages ? messages : [];
  }
}
