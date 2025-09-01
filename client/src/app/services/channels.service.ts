import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Channel } from '../models/channel.model';

@Injectable({
    providedIn: 'root',
})
export class ChannelService {
    channelsKey: string = 'channels';
    allChannels!: Channel[];

    constructor(private storage: StorageService) {
        this.seedInitialChannels();
    }

    private seedInitialChannels(): void {
        const channels = this.storage.load<Channel[]>(this.channelsKey);
        if (!channels || channels.length === 0) {
            const initialChannels: Channel[] = [
                {
                    id: '1',
                    name: 'General',
                    groupId: '1',
                    createdBy: '1',
                    members: ['1'],
                },
                {
                    id: '2',
                    name: 'Random',
                    groupId: '1',
                    createdBy: '1',
                    members: ['1'],
                },
                {
                    id: '3',
                    name: 'Development',
                    groupId: '2',
                    createdBy: '1',
                    members: ['1'],
                },
                {
                    id: '4',
                    name: 'Design',
                    groupId: '2',
                    createdBy: '1',
                    members: ['1'],
                },
                {
                    id: '5',
                    name: 'Campaigns',
                    groupId: '3',
                    createdBy: '1',
                    members: ['1'],
                },
                {
                    id: '6',
                    name: 'Feedback',
                    groupId: '3',
                    createdBy: '1',
                    members: ['1'],
                },
            ];
            this.storage.save(this.channelsKey, initialChannels);
            this.allChannels = initialChannels;
        } else {
            this.allChannels = channels;
        }
    }

    getChannels(groupId?: string): Channel[] {
        const allChannels =
            this.storage.load<Channel[]>(this.channelsKey) || [];
        if (groupId) {
            return allChannels.filter((channel) => channel.groupId === groupId);
        }
        return allChannels;
    }

    newChannel(channel: Channel) {
        if (!this.allChannels) {
            this.allChannels = [];
        }

        const allChannels =
            this.storage.load<Channel[]>(this.channelsKey) ?? [];

        allChannels.push(channel);

        this.storage.save(this.channelsKey, allChannels);

        this.allChannels = allChannels;
    }

    deleteChannel(channel: Channel) {
        if (this.allChannels) {
            this.allChannels = this.allChannels.filter(
                (c) => c.id !== channel.id
            );
            this.storage.save(this.channelsKey, this.allChannels);
        }
    }
}
