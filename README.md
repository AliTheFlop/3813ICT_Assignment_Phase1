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

This service has 3 functions at the moment:

-   getGroups() -> gets all the current groups.
-   hasPending() -> checks if the given user has already requested to join a group.
-   requestToJoin() -> checks if the given user is currently in the group or has requested to join the group before, if not then it allows their request through.

## 28th August

1. Begun work on the frontend components. Primarily the dashboard.
