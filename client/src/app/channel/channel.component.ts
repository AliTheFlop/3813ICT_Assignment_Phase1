import { Component } from '@angular/core';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent {
  channelName: string = 'Marketplace';
  draft = '';

  send() {
    console.log('sent');
  }

  onEnter(event: Event) {
    event.preventDefault();
    this.send();
  }
}
