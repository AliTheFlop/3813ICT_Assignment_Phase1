import { Component, Input } from '@angular/core';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  @Input() message!: Message;

  // Maps status to a small icon + sr-only text
  statusIcon(status?: Message['status']) {
    switch (status) {
      case 'sending':
        return { icon: 'bi-arrow-repeat', label: 'Sending' };
      case 'sent':
        return { icon: 'bi-check', label: 'Sent' };
      case 'delivered':
        return { icon: 'bi-check2-all', label: 'Delivered' };
      case 'read':
        return { icon: 'bi-eye', label: 'Read' };
      case 'failed':
        return { icon: 'bi-exclamation-triangle', label: 'Failed' };
      default:
        return null;
    }
  }
}
