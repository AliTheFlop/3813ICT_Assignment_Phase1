import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group.model';
import { GroupService } from '../services/group.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  groups: Group[] = [];
  user?: User;
  currentUserKey = 'user';

  constructor(
    private groupService: GroupService,
    private router: Router,
    private storage: StorageService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.storage.load(this.currentUserKey) as User | null;
    console.log(currentUser);
    if (!currentUser) {
      this.router.navigate(['/']);
      return;
    }
    this.user = currentUser;
    this.groups = this.groupService.getGroups();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
