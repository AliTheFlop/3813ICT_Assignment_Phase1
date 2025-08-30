import { Component, Input } from '@angular/core';
import { Message } from '../models/message.model';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  @Input() message!: Message;
  @Input() currentUserId!: number;

  constructor(private messageService: MessageService) {}

  isMine(): boolean {
    return this.message.userId === this.currentUserId;
  }
}
