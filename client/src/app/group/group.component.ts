import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css'],
})
export class GroupComponent {
    groupName = 'john';
    groupId!: string;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.groupId = params.get('groupId')!;
            console.log('Group ID:', this.groupId);
        });
    }
}
