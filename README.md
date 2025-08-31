# 3813 A1

## 26th August

1. Project has been initialized.
2. Created the initial storage service as a wrapper around the localStorage API.
3. Created a basic login form to test out our storage service.

## 27th August

1. Updated models to add a User, Group, and Channel model
2. Added an auth service that allows for authentication using basic user + pass checking.

This service has 5 functions at the moment:

-   seedSuperUser() -> which adds the initial superuser if they're not in the database yet. This is also called in the constructor() so there's always a superuser.
-   login() -> checks between the username & password given to see if there's a match. No huge robust authentication mechanisms here.
-   getUser() -> gets the current user that's logged in. Useful helper function.
-   hasRole() -> checks if a user has a certain role. Useful helper function.
-   logout() -> clears current user.

3. Added a group service to contain all the functions needed for group management

This service will be a blueprint for the channel & message services, which would all have these functions:

-   seedGroups() -> or channels / messages. This makes sure there's always dummy data in storage to work with.
-   getGroups() -> or channels / messages. Gets all the current data in storage.

Group specific:

-   hasPending() -> checks if the given user has already requested to join a group.
-   requestToJoin() -> checks if the given user is currently in the group or has requested to join the group before, if not then it allows their request through.

## 28th August

1. Begun work on the frontend components.
2. Created the dashboard which loads the group component so the user can select a group.
3. Crated the group which loads the channels so the user can select a channel to chat in.
4. Created the channel which doesn't load anything yet, but routes from the dashboard to the channel are set and smooth.

## 29th August

1. Added dummy group data in local storage, plus dummy channels but that does not work properly yet
2. Updated dashboard to implement a proper group navigator

## 30th August

1. Fixed up dashboard & group components to grab the dummy data from local storage and populate it on the app (this includes channels as well)
2. Updated channels to fix a bug that wasn't allowing the container to show up.
3. Styled every single component using bootstrap -> dashboard, group, and channel components.
4. Created a messages component and populated channels using dummy messages.
5. Implemented a proper authentication system where the user cannot access /dashboard without being logged in. Also added a dummy super user & two dummy users.
6. Added a "create group" button that allows the super user to create new groups. The button uses \*ngIf to only display if the user is the super user.
