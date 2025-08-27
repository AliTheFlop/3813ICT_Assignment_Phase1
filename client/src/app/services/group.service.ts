import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Group } from '../models/group.model';

@Injectable({
    providedIn: 'root',
})
export class GroupService {
    groupsKey: string = 'group';
    userId?: number;

    constructor(private storage: StorageService) {
        this.getGroups();
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
