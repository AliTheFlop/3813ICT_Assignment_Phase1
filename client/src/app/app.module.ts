import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

// What I've personally imported starts here
import { FormsModule } from '@angular/forms';
import { GroupListComponent } from './group/group-list/group-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupComponent } from './group/group.component';
import { ChannelComponent } from './channel/channel.component';
import { SelectGroupPromptComponent } from './select-group-prompt/select-group-prompt.component';
import { SelectChannelPromptComponent } from './select-channel-prompt/select-channel-prompt.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, GroupListComponent, DashboardComponent, GroupComponent, ChannelComponent, SelectGroupPromptComponent, SelectChannelPromptComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
