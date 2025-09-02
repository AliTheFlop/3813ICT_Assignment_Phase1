import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupComponent } from './group/group.component';
import { ChannelComponent } from './channel/channel.component';
import { MessageComponent } from './message/message.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'group/:groupId',
                component: GroupComponent,
                children: [
                    {
                        path: 'channels/:channelId',
                        component: ChannelComponent,
                        children: [
                            {
                                path: 'messages',
                                component: MessageComponent,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '/',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
