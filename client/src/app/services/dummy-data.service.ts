// dummy-data.service.ts
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from './storage.service';
import { User } from '../models/user.model';
import { Group } from '../models/group.model';
import { Channel } from '../models/channel.model';
import { Message } from '../models/message.model';

@Injectable({ providedIn: 'root' })
export class DummyDataService {
  constructor(private storage: StorageService) {}

  seed(): void {
    if (this.storage.load<User[]>('users')) return;

    // ----- Users -----
    const superId = uuidv4();
    const jamesId = uuidv4();
    const anthonyId = uuidv4();
    const users: User[] = [
      {
        id: superId,
        username: 'super',
        email: 'super@system.com',
        password: '123',
        roles: ['SUPER_ADMIN'],
        groups: [],
      },
      {
        id: jamesId,
        username: 'james',
        email: 'james@system.com',
        password: '123',
        roles: ['USER'],
        groups: [],
      },
      {
        id: anthonyId,
        username: 'anthony',
        email: 'anthony@system.com',
        password: '123',
        roles: ['USER'],
        groups: [],
      },
    ];
    this.storage.save('users', users);

    // ----- Groups -----
    const groups: Group[] = ['General', 'Engineering', 'Marketing'].map(
      (name) => ({
        id: uuidv4(),
        name,
        ownerUserId: superId,
        adminUserIds: [superId],
        memberUserIds: [superId],
        channelIds: [],
        joinRequests: [],
      })
    );
    this.storage.save('groups', groups);

    // ----- Channels -----
    const channels: Channel[] = [];
    groups.forEach((g) => {
      channels.push({
        id: uuidv4(),
        name: 'General',
        groupId: g.id,
        createdBy: superId,
        members: [superId],
      });
      channels.push({
        id: uuidv4(),
        name: 'Random',
        groupId: g.id,
        createdBy: superId,
        members: [superId],
      });
    });
    this.storage.save('channels', channels);

    // ----- Messages (optional sample) -----
    const messages: Message[] = channels.map((c) => ({
      id: uuidv4(),
      groupId: c.groupId,
      channelId: c.id,
      userId: superId,
      content: `Welcome to ${c.name}!`,
      createdAt: new Date().toISOString(),
    }));
    this.storage.save('messages', messages);
  }
}
