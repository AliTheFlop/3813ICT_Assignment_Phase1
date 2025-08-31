import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Channel } from '../models/channel.model';

@Injectable({
    providedIn: 'root',
})
export class ChannelService {
    channelsKey: string = 'channels';

    constructor(private storage: StorageService) {
        this.seedInitialChannels();
    }

    private seedInitialChannels(): void {
        const channels = this.storage.load<Channel[]>(this.channelsKey);
        if (!channels || channels.length === 0) {
            const initialChannels: Channel[] = [
                { id: '1', name: 'General', groupId: '1', members: ['1'] },
                { id: '2', name: 'Random', groupId: '1', members: ['1'] },
                { id: '3', name: 'Development', groupId: '2', members: ['1'] },
                { id: '4', name: 'Design', groupId: '2', members: ['1'] },
                { id: '5', name: 'Campaigns', groupId: '3', members: ['1'] },
                { id: '6', name: 'Feedback', groupId: '3', members: ['1'] },
            ];
            this.storage.save(this.channelsKey, initialChannels);
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
}
