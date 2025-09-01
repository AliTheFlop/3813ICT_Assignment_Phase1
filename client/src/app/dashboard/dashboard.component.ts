import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Group } from '../models/group.model';
import { GroupService } from '../services/group.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    // Initial variables...
    groups: Group[] = [];
    user?: User;
    currentUserKey = 'user';
    selectedGroup?: Group;
    selectedGroupUsers?: User[];
    newGroupName?: string;
    allUsers?: User[] | null;

    // modals
    @ViewChild('groupUsersModal') groupUsersModal!: TemplateRef<any>;
    @ViewChild('newGroupModal') newGroupModal!: TemplateRef<any>;
    @ViewChild('userListModal') userListModal!: TemplateRef<any>;

    constructor(
        private groupService: GroupService,
        private router: Router,
        private storage: StorageService,
        private auth: AuthService,
        private modalService: NgbModal,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        const currentUser = this.storage.load(
            this.currentUserKey
        ) as User | null;
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

    openGroupModal(group: Group) {
        this.selectedGroup = group;
        this.getGroupUserInfo(group);
        this.modalService.open(this.groupUsersModal, { centered: true });
    }

    getGroupUserInfo(group: Group) {
        // get all users
        const allUsers = this.userService.allUsers;

        // check which users are in this group through user ID
        const groupUsers = allUsers?.filter((u) =>
            group.memberUserIds.includes(u.id)
        );
        console.log('Group ' + group.name + ' has these users: ');
        console.log(groupUsers);

        this.selectedGroupUsers = groupUsers;
    }

    openNewGroupModal() {
        this.newGroupName = '';
        this.modalService.open(this.newGroupModal, { centered: true });
    }

    newGroup(modal: any) {
        const groupInfo: Group = {
            id: uuidv4(),
            name: this.newGroupName ? this.newGroupName : '',
            ownerUserId: this.user ? this.user.id : '',
            adminUserIds: [this.user ? this.user.id : ''],
            memberUserIds: [this.user ? this.user.id : ''],
            channelIds: [],
            joinRequests: [],
        };

        this.groupService.newGroup(groupInfo);
        this.groups = this.groupService.getGroups();
        modal.close();
    }

    deleteGroup(group: Group, modal: any) {
        this.groupService.deleteGroup(group);
        this.groups = this.groupService.getGroups();
        modal.close();
    }

    openUserListModal() {
        this.modalService.open(this.userListModal, { centered: true });
    }
}
