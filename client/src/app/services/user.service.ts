import { Injectable, OnInit } from '@angular/core';
import { StorageService } from './storage.service';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    allUsers!: User[] | null;
    usersKey: string = 'users';

    constructor(private storage: StorageService, private auth: AuthService) {
        this.getAllUsers();
    }

    getAllUsers() {
        this.allUsers = this.storage.load(this.usersKey);
        return this.allUsers;
    }

    saveAllUsers(users: User[]) {
        this.storage.save(this.usersKey, users);
    }

    updateUser(updatedUser: User) {
        if (this.allUsers) {
            const index = this.allUsers.findIndex(
                (u) => u.id === updatedUser.id
            );

            if (index === -1) {
                console.log('User not found');
                return;
            }

            this.allUsers[index] = updatedUser;
            this.saveAllUsers(this.allUsers);
        }
    }

    promoteUser(user: User) {
        if (!user.roles.includes('USER')) {
            user.roles.push('USER');
        }

        if (
            !user.roles.includes('SUPER_ADMIN') &&
            user.roles.includes('GROUP_ADMIN')
        ) {
            user.roles.push('SUPER_ADMIN');
        } else if (!user.roles.includes('GROUP_ADMIN')) {
            user.roles.push('GROUP_ADMIN');
        } else {
            console.log('User is already at the highest level!');
            return false;
        }

        this.updateUser(user);
        return true;
    }

    demoteUser(user: User) {
        if (user.roles.includes('SUPER_ADMIN')) {
            user.roles = user.roles.filter((r) => r !== 'SUPER_ADMIN');
        } else if (user.roles.includes('GROUP_ADMIN')) {
            user.roles = user.roles.filter((r) => r !== 'GROUP_ADMIN');
        } else {
            console.log('User is already at the lowest level!');
            return false;
        }

        this.updateUser(user);
        return true;
    }
}
