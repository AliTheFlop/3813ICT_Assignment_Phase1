import { Component } from '@angular/core';
import { ChannelService } from '../services/channels.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message.model';

@Component({
    selector: 'app-channel',
    templateUrl: './channel.component.html',
    styleUrls: ['./channel.component.css'],
})
export class ChannelComponent {
    channelName: string | undefined = 'Loading...';
    channelId!: string;
    groupId!: string;
    messages!: Message[];
    draft = '';

    constructor(
        private route: ActivatedRoute,
        private channelService: ChannelService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        console.log('Initializing Channel...');
        this.route.paramMap.subscribe((params) => {
            this.channelId = String(params.get('channelId'));
            this.groupId = String(
                this.route.parent?.snapshot.paramMap.get('groupId')
            );
            console.log(
                'Group ID:' + this.groupId + ' Channel ID: ' + this.channelId
            );
            const channels = this.channelService.getChannels();
            const channel = channels.find(
                (c) => c.groupId === this.groupId && c.id === this.channelId
            );

            this.channelName = channel?.name;

            console.log('Fetching messages for channel: ' + this.channelName);
            const messages = this.messageService.getMessages();
            this.messages = messages.filter(
                (m) =>
                    m.groupId === this.groupId && m.channelId === this.channelId
            );
        });
    }

    send() {
        console.log('sent');
    }

    onEnter(event: Event) {
        event.preventDefault();
        this.send();
    }
}
