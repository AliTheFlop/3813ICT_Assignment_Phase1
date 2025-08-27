import { Component } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { AuthService } from 'src/app/services/auth.service';
import { Group } from 'src/app/models/group.model';

@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.css'],
})
export class GroupListComponent {
    groups: Group[] = [];
    userId?: number;

    constructor(private groupService: GroupService, private auth: AuthService) {
        const user = this.auth.getUser();
        this.userId = user?.id;
        this.groups = this.groupService.getGroups();
    }

    isMember(g: Group): boolean {
        return !!this.userId && g.memberUserIds.includes(this.userId);
    }

    hasPending(g: Group): boolean {
        return !!this.userId && this.groupService.hasPending(g, this.userId);
    }
}
