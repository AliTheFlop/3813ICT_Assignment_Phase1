import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Group } from '../models/group.model';
import { GroupService } from '../services/group.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from 'uuid';

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
    newGroupInfo?: Group = {
        id: uuidv4(),
        ownerUserId: '',
        name: '',
        adminUserIds: [''],
        memberUserIds: [''],
        channelIds: [''],
        joinRequests: [],
    };

    // modals
    @ViewChild('groupUsersModal') groupUsersModal!: TemplateRef<any>;
    @ViewChild('newGroupModal') newGroupModal!: TemplateRef<any>;

    constructor(
        private groupService: GroupService,
        private router: Router,
        private storage: StorageService,
        private auth: AuthService,
        private modalService: NgbModal
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
        const allUsers = this.auth.getAllUsers();

        // check which users are in this group through user ID
        const groupUsers = allUsers?.filter((u) =>
            group.memberUserIds.includes(u.id)
        );
        console.log('Group ' + group.name + ' has these users: ');
        console.log(groupUsers);

        this.selectedGroupUsers = groupUsers;
    }

    openNewGroupModal() {
        this.modalService.open(this.newGroupModal, { centered: true });
    }

    newGroup() {
        const groupInfo = {
            id: 2,
            name: 'Engineering',
            ownerUserId: 1,
            adminUserIds: [1],
            memberUserIds: [1],
            channelIds: [],
            joinRequests: [],
        };
    }
}
