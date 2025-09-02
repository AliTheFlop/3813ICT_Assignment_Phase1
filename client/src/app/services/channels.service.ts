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
    const channels = this.storage.load<Channel[]>(this.channelsKey) || [];
    this.allChannels = channels;
  }

  getChannels(groupId?: string): Channel[] {
    const allChannels = this.storage.load<Channel[]>(this.channelsKey) || [];
    if (groupId) {
      return allChannels.filter((channel) => channel.groupId === groupId);
    }
    return allChannels;
  }

  newChannel(channel: Channel) {
    if (!this.allChannels) {
      this.allChannels = [];
    }

    const allChannels = this.storage.load<Channel[]>(this.channelsKey) ?? [];

    allChannels.push(channel);

    this.storage.save(this.channelsKey, allChannels);

    this.allChannels = allChannels;
  }

  deleteChannel(channel: Channel) {
    if (this.allChannels) {
      this.allChannels = this.allChannels.filter((c) => c.id !== channel.id);
      this.storage.save(this.channelsKey, this.allChannels);
    }
  }
}
