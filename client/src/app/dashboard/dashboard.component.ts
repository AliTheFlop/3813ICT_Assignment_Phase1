import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group.model';
import { GroupService } from '../services/group.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    groups: Group[] = [];

    constructor(private groupService: GroupService) {}

    ngOnInit(): void {
        this.groups = this.groupService.getGroups();
    }
}
