import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  allUsers!: User[];
  usersKey: string = 'users';

  constructor(private storage: StorageService) {}
}
