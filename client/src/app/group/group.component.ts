import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../services/group.service';
import { ChannelService } from '../services/channels.service';
import { Group } from '../models/group.model';
import { Channel } from '../models/channel.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css'],
})
export class GroupComponent {
    user?: User | null;
    groupName: string | undefined = 'loading...';
    groupId!: string;
    channels: Channel[] = [];
    newChannelName!: string;
    selectedGroup?: Group;

    // modals
    @ViewChild('newChannelModal') newChannelModal!: TemplateRef<any>;

    constructor(
        private route: ActivatedRoute,
        private groupService: GroupService,
        private channelService: ChannelService,
        private auth: AuthService,
        private modalService: NgbModal
    ) {
        this.user = this.auth.getUser();
        console.log('GROUP COMPONENT USER: ');
        console.log(this.user);
    }

    ngOnInit() {
        console.log('Initializing channels...');
        this.route.paramMap.subscribe((params) => {
            this.groupId = String(params.get('groupId'));
            console.log('Group ID:', this.groupId);

            this.selectedGroup = this.groupService.getSingleGroup(this.groupId);

            console.log('Grabbing all groups...');
            const groups: Group[] = this.groupService.getGroups();
            const group = groups.find((g) => g.id === this.groupId);
            this.groupName = group?.name;

            console.log('Grabbing all channels for group: ' + this.groupId);
            const channels: Channel[] = this.channelService.getChannels(
                this.groupId
            );
            this.channels = channels.filter((c) => c.groupId === this.groupId);
            console.log(this.channels);
        });
    }

    openNewChannelModal() {
        this.newChannelName = '';
        this.modalService.open(this.newChannelModal, { centered: true });
    }

    newChannel(modal: any) {
        const channelInfo: Channel = {
            id: uuidv4(),
            name: this.newChannelName ? this.newChannelName : '',
            groupId: this.groupId,
            createdBy: this.user ? this.user.id : '',
            members: [],
        };

        this.channelService.newChannel(channelInfo);
        this.channels = this.channelService.getChannels(channelInfo.groupId);
        modal.close();
    }
}
