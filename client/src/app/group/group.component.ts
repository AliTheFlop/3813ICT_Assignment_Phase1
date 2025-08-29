import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../services/group.service';
import { ChannelService } from '../services/channels.service';
import { Group } from '../models/group.model';
import { Channel } from '../models/channel.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent {
  groupName: string | undefined = 'loading...';
  groupId!: number;
  channels: Channel[] = [];

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private channelService: ChannelService
  ) {}

  ngOnInit() {
    console.log('Initializing...');
    this.route.paramMap.subscribe((params) => {
      this.groupId = Number(params.get('groupId'));
      console.log('Group ID:', this.groupId);

      console.log('Grabbing all groups...');
      const groups: Group[] = this.groupService.getGroups();
      const group = groups.find((g) => g.id === this.groupId);
      this.groupName = group?.name;

      console.log('Grabbing all channels for group: ' + this.groupId);
      const channels: Channel[] = this.channelService.getChannels();
      this.channels = channels.filter((c) => c.groupId === this.groupId);
      console.log(this.channels);
    });
  }
}
