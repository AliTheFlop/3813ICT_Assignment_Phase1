# Repository Organization & Workflow

## Folder Layout

-   **Root** – Node/Express server (TBA During Phase 2).
-   **client/** – Angular frontend application.
-   **client/node_modules/** – dependencies for client.

## Commit Cadence

Frequent commits during development days to track features and bug fixes.

---

# Data Structures

## Client

### User

```ts
{
  id,
  username,
  email,
  password,
  roles[],
  groups[]
}
```

### Group

```ts
{
  id,
  name,
  ownerUserId,
  adminUserIds[],
  memberUserIds[],
  channelIds[],
  joinRequests[{ userId, status }]
}
```

### Channel

```ts
{
  id,
  name,
  groupId,
  createdBy,
  members[]
}
```

### Message

```ts
{
    id, groupId, channelId, userId, content, createdAt;
}
```

# Angular Architecture

## Components

-   **login/** – authentication page.
-   **dashboard/** – landing page after login; lists groups.
-   **group/** – shows channels for a specific group.
-   **channel/** – displays channel content and child message list.
-   **message/** – renders messages within a channel.
-   **user-list/** – administrative list of users.

## Services

-   **auth.service** – login/logout, role checks, user seeding.
-   **group.service** – group CRUD, join requests.
-   **channels.service** – channel CRUD within groups.
-   **message.service** – message storage and retrieval.
-   **storage.service** – wrapper around localStorage.
-   **dummy-data.service** – (if used) seeds default data for testing.

## Models

Located in `src/app/models/`:

-   `user.model.ts`
-   `group.model.ts`
-   `channel.model.ts`
-   `message.model.ts`
-   `roles.ts`

## Routes

Defined in `src/app/app-routing.module.ts`:

-   `/` → LoginComponent
-   `/dashboard` → DashboardComponent
-   `/dashboard/group/:groupId` → GroupComponent
-   `/dashboard/group/:groupId/channels/:channelId` → ChannelComponent
-   `/dashboard/group/:groupId/channels/:channelId/messages` → MessageComponent
