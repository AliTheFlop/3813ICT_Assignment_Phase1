import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Group } from '../models/group.model';
import { ChannelService } from './channels.service';

@Injectable({
    providedIn: 'root',
})
export class GroupService {
    groupsKey: string = 'groups';
    userId?: number;

    constructor(
        private storage: StorageService,
        private channelService: ChannelService
    ) {
        this.seedInitialGroups();
    }

    private seedInitialGroups(): void {
        const groups = this.storage.load<Group[]>(this.groupsKey);
        if (!groups || groups.length === 0) {
            const initialGroups: Group[] = [
                {
                    id: 1,
                    name: 'General',
                    ownerUserId: 1,
                    adminUserIds: [1],
                    memberUserIds: [1],
                    channelIds: [],
                    joinRequests: [],
                },
                {
                    id: 2,
                    name: 'Engineering',
                    ownerUserId: 1,
                    adminUserIds: [1],
                    memberUserIds: [1],
                    channelIds: [],
                    joinRequests: [],
                },
                {
                    id: 3,
                    name: 'Marketing',
                    ownerUserId: 1,
                    adminUserIds: [1],
                    memberUserIds: [1],
                    channelIds: [],
                    joinRequests: [],
                },
            ];

            const allChannels = this.channelService.getChannels();
            initialGroups.forEach((group) => {
                group.channelIds = allChannels
                    .filter((c) => c.groupId === group.id)
                    .map((c) => c.id);
            });

            this.storage.save(this.groupsKey, initialGroups);
        }
    }

    getGroups(): Group[] {
        const groups = this.storage.load<Group[]>(this.groupsKey);
        return groups ? groups : [];
    }

    hasPending(group: Group, userId: number): boolean {
        return !!group.joinRequests.find(
            (r) => r.userId === userId && r.status === 'PENDING'
        );
    }

    requestToJoin(groupId: number, userId: number) {
        const groups = this.storage.load<Group[]>('groups') || [];
        const g = groups.find((x) => x.id === groupId);
        if (!g) return;

        const alreadyMember = g.memberUserIds.includes(userId);
        const alreadyPending = g.joinRequests.some(
            (r) => r.userId && r.status === 'PENDING'
        );

        if (!alreadyMember && !alreadyPending) {
            g.joinRequests.push({ userId, status: 'PENDING' });
            this.storage.save('groups', groups);
        }
    }
}
