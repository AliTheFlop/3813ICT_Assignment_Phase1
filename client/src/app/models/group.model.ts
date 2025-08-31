export type JoinStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface JoinRequest {
  userId: number;
  status: JoinStatus;
}

export interface Group {
  id: number;
  name: string;
  ownerUserId: number;
  adminUserIds: number[];
  memberUserIds: number[];
  channelIds: number[];
  joinRequests: JoinRequest[];
}

/**

The group model's adminIds & channelIds 
contain the users who are admins of this group, 
and the different channels inside this group.

 */
