export type JoinStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface JoinRequest {
    userId: string;
    status: JoinStatus;
}

export interface Group {
    id: string;
    name: string;
    ownerUserId: string;
    adminUserIds: string[];
    memberUserIds: string[];
    channelIds: string[];
    joinRequests: JoinRequest[];
}

/**

The group model's adminIds & channelIds 
contain the users who are admins of this group, 
and the different channels inside this group.

 */
