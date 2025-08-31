export interface Message {
    id: number;
    groupId: number;
    channelId: number;
    userId: number;
    content: string;
    createdAt: Date | string;
}

// Dummy messages
export const dummyMessages: Message[] = [
    // Group 1, Channel 1 (channelId 1)
    {
        id: 1,
        groupId: 1,
        channelId: 1,
        userId: 101,
        content: 'Hey team, welcome to group 1 channel 1!',
        createdAt: new Date(),
    },
    {
        id: 2,
        groupId: 1,
        channelId: 1,
        userId: 999, // me
        content: 'Thanks, glad to be here!',
        createdAt: new Date(),
    },

    // Group 1, Channel 2 (channelId 2)
    {
        id: 3,
        groupId: 1,
        channelId: 2,
        userId: 102,
        content: 'This is channel 2 in group 1.',
        createdAt: new Date(),
    },
    {
        id: 4,
        groupId: 1,
        channelId: 2,
        userId: 999,
        content: 'Yep, testing messages here as well.',
        createdAt: new Date(),
    },

    // Group 2, Channel 1 (channelId 3)
    {
        id: 5,
        groupId: 2,
        channelId: 3,
        userId: 201,
        content: 'Kicking off group 2 channel 1.',
        createdAt: new Date(),
    },
    {
        id: 6,
        groupId: 2,
        channelId: 3,
        userId: 999,
        content: 'Cool, let’s keep this channel active.',
        createdAt: new Date(),
    },

    // Group 2, Channel 2 (channelId 4)
    {
        id: 7,
        groupId: 2,
        channelId: 4,
        userId: 202,
        content: 'Group 2, channel 2 ready to go.',
        createdAt: new Date(),
    },
    {
        id: 8,
        groupId: 2,
        channelId: 4,
        userId: 999,
        content: 'Nice, I’ll drop updates here.',
        createdAt: new Date(),
    },

    // Group 3, Channel 1 (channelId 5)
    {
        id: 9,
        groupId: 3,
        channelId: 5,
        userId: 301,
        content: 'Starting group 3 channel 1 thread.',
        createdAt: new Date(),
    },
    {
        id: 10,
        groupId: 3,
        channelId: 5,
        userId: 999,
        content: 'Following along, thanks!',
        createdAt: new Date(),
    },

    // Group 3, Channel 2 (channelId 6)
    {
        id: 11,
        groupId: 3,
        channelId: 6,
        userId: 302,
        content: 'Hello from group 3 channel 2.',
        createdAt: new Date(),
    },
    {
        id: 12,
        groupId: 3,
        channelId: 6,
        userId: 999,
        content: 'Great, messages are working fine.',
        createdAt: new Date(),
    },
];
