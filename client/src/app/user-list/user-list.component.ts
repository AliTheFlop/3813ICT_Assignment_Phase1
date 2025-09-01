import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  allUsers?: User[] | null;
  currentUser?: User | null;

  constructor(private userService: UserService, private auth: AuthService) {
    this.allUsers = this.userService.allUsers;
    this.currentUser = this.auth.getUser();
  }

  ngOnInit() {}

  promoteUser(user: User) {
    this.userService.promoteUser(user);
    this.userService.getAllUsers();
  }

  demoteUser(user: User) {
    this.userService.demoteUser(user);
    this.userService.getAllUsers();
  }
}
