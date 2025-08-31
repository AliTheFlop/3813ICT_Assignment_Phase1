import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';
import { Role } from '../models/roles';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;
  private usersKey = 'users';
  private currentUserKey = 'user';

  constructor(private storage: StorageService) {
    this.seedUsers();
    this.getAllUsers();
  }

  private seedUsers(): void {
    // THIS IS FOR PHASE 1 ONLY - WILL BE DELETED WHEN WE ADD A DATABASE. Or maybe we'll keep it to ensure dummy data is always there, not sure yet...

    let users = this.storage.load<User[]>(this.usersKey) || [];
    // create a dummy super user
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

    // create 2 dummy users
    if (users.filter((u: User) => u.roles.includes('USER')).length < 2) {
      const user1: User = {
        id: 2,
        username: 'james',
        email: 'james@system.com',
        password: '123',
        roles: ['USER'],
        groups: [1],
      };

      const user2: User = {
        id: 3,
        username: 'anthony',
        email: 'anthony@system.com',
        password: '123',
        roles: ['USER'],
        groups: [1],
      };
      users.push(user1);
      users.push(user2);
      this.storage.save(this.usersKey, users);
    }
  }

  login(email: string, password: string): boolean {
    if (!this.currentUser) {
      const users = this.storage.load<User[]>(this.usersKey) || [];
      const found = users.find(
        (u: User) => u.email === email && u.password === password
      );
      if (found) {
        this.currentUser = found;
        this.storage.save(this.currentUserKey, found);
        return true;
      }
    }
    return false;
  }

  logout(): void {
    this.storage.remove(this.currentUserKey);
    this.currentUser = null;
  }

  getUser(): User | null {
    return this.currentUser;
  }

  getAllUsers(groupId: number | null = null) {
    const users: User[] | null = this.storage.load(this.usersKey);
    console.log(users);
    if (!groupId) {
      return users;
    } else {
      const filteredUsers = users?.filter((u) => u.groups.includes(groupId));
      return filteredUsers;
    }
  }

  hasRole(role: Role): boolean {
    return this.currentUser?.roles.includes(role) || false;
  }
}
