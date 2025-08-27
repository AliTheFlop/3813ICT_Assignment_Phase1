import { Role } from './roles';

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    roles: Role[];
    groups: number[];
}

/*

The user model's roles array tells it exactly what role we are, whether it's SUPER_USER or GROUP_ADMIN, etc...

The different roles are:

1. SUPER_ADMIN
2. GROUP_ADMIN
3. CHAT_USER

*/
