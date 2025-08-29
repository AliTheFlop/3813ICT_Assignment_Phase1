import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupComponent } from './group/group.component';
import { ChannelComponent } from './channel/channel.component';
import { SelectGroupPromptComponent } from './select-group-prompt/select-group-prompt.component';
import { SelectChannelPromptComponent } from './select-channel-prompt/select-channel-prompt.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: '',
                component: SelectGroupPromptComponent,
                pathMatch: 'full',
            },
            {
                path: 'group/:groupId',
                component: GroupComponent,
                children: [
                    {
                        path: '',
                        component: SelectChannelPromptComponent,
                        pathMatch: 'full',
                    },
                    {
                        path: 'channels/:channelId',
                        component: ChannelComponent,
                    },
                ],
            },
        ],
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '/dashboard',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
