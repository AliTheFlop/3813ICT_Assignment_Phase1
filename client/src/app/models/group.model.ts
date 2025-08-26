export interface Group {
  id: number;
  name: string;
  adminIds: number[]; // users who are admins of this group
  channelIds: number[]; // channels in this group
}

/**

The group model's adminIds & channelIds 
contain the users who are admins of this group, 
and the different channels inside this group.

 */
