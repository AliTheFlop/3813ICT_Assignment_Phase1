import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
    groups = [
        { id: '1', name: 'General' },
        { id: '2', name: 'Engineering' },
        { id: '3', name: 'Marketing' },
    ];
}
