import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';
import { Role } from '../models/roles';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    /** Current user is either of type null or User */
    private currentUser: User | null = null;
    /** This is for localStorage so it knows which key to use to access all users */
    private usersKey = 'users';

    /** Initializes superuser when it first loads */
    constructor(private storage: StorageService) {
        this.seedSuperUser();
    }

    /** Seed the initial Super Admin if not present */
    private seedSuperUser(): void {
        let users = this.storage.load<User[]>(this.usersKey) || [];
        if (!users.find((u: User) => u.username === 'super')) {
            const superUser: User = {
                id: 1,
                username: 'super',
                email: 'super@system.com',
                password: '123',
                roles: ['SUPER_ADMIN'],
                groups: [],
            };
            users.push(superUser);
            this.storage.save(this.usersKey, users);
        }
    }

    /** Attempt login */
    login(username: string, password: string): boolean {
        const users = this.storage.load<User[]>(this.usersKey) || [];
        const found = users.find(
            (u: User) => u.username === username && u.password === password
        );
        if (found) {
            this.currentUser = found;
            return true;
        }
        return false;
    }

    /** Return current logged in user */
    getUser(): User | null {
        return this.currentUser;
    }

    /** Check role */
    hasRole(role: Role): boolean {
        return this.currentUser?.roles.includes(role) || false;
    }

    /** Logout */
    logout(): void {
        this.currentUser = null;
    }
}
