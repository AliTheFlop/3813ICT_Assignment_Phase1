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
        // snapshot = static read (good if it won't change)
        this.groupId = this.route.snapshot.paramMap.get('groupId')!;

        // OR: subscribe = dynamic updates (if ID might change while staying in same component)
        this.route.paramMap.subscribe((params) => {
            this.groupId = params.get('groupId')!;
            console.log('Group ID:', this.groupId);
        });
    }
}
