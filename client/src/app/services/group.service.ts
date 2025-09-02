import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Group } from '../models/group.model';
import { ChannelService } from './channels.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  groupsKey: string = 'groups';
  userId?: string;
  allGroups?: Group[] | null;

  constructor(
    private storage: StorageService,
    private channelService: ChannelService
  ) {
    this.seedInitialGroups();
  }

  private seedInitialGroups(): void {
    const groups = this.storage.load<Group[]>(this.groupsKey);

    this.allGroups = groups;
  }

  getGroups(): Group[] {
    const groups = this.storage.load<Group[]>(this.groupsKey);
    return groups ? groups : [];
  }

  getSingleGroup(groupId: string): Group | undefined {
    const groups = this.getGroups();
    return groups.find((g) => groupId === g.id);
  }

  newGroup(group: Group) {
    if (!this.allGroups) {
      this.allGroups = [];
    }

    this.allGroups.push(group);
    this.storage.save(this.groupsKey, this.allGroups);
  }

  deleteGroup(group: Group) {
    if (this.allGroups) {
      this.allGroups = this.allGroups.filter((g) => g.id !== group.id);
      this.storage.save(this.groupsKey, this.allGroups);
    }
  }

  hasPending(group: Group, userId: string) {
    // was number
    return !!group.joinRequests.find(
      (r) => r.userId === userId && r.status === 'PENDING'
    );
  }

  requestToJoin(groupId: string, userId: string) {
    // was number
    const groups = this.storage.load<Group[]>('groups') || [];
    const g = groups.find((x) => x.id === groupId);
    if (!g) {
      return;
    }

    const alreadyMember = g.memberUserIds.includes(userId);
    const alreadyPending = g.joinRequests.some(
      (r) => r.userId === userId && r.status === 'PENDING'
    );

    if (!alreadyMember && !alreadyPending) {
      g.joinRequests.push({ userId, status: 'PENDING' });
      this.storage.save('groups', groups);
    } else {
      console.log('Already a member of this group!');
    }
  }

  approveJoinRequest(groupId: string, userId: string) {
    const groups = this.storage.load<Group[]>(this.groupsKey) || [];
    const g = groups.find((x) => x.id === groupId);
    if (!g) {
      return;
    }

    const req = g.joinRequests.find(
      (r) => r.userId === userId && r.status === 'PENDING'
    );
    if (!req) {
      return;
    }

    req.status = 'APPROVED';

    if (!g.memberUserIds.includes(userId)) {
      g.memberUserIds.push(userId);
    }
    this.storage.save(this.groupsKey, groups);
  }

  rejectJoinRequest(groupId: string, userId: string) {
    const groups = this.storage.load<Group[]>(this.groupsKey) || [];
    const g = groups.find((x) => x.id === groupId);
    if (!g) {
      return;
    }

    const req = g.joinRequests.find(
      (r) => r.userId === userId && r.status === 'PENDING'
    );
    if (!req) {
      return;
    }

    req.status = 'REJECTED';
    this.storage.save(this.groupsKey, groups);
  }
}
