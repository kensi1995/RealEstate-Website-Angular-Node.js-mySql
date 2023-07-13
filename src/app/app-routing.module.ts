import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminRealEstatesComponent } from './admin-real-estates/admin-real-estates.component';
import { AuthGuard } from './admin-panel/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { UserRealEstatesComponent } from './user-real-estates/user-real-estates.component';
import { AddRealEstateComponent } from './add-real-estate/add-real-estate.component';
import { MessageComponent } from './message/message.component';
import { MessageInboxComponent } from './message-inbox/message-inbox.component';
import { MessageSendComponent } from './message-send/message-send.component';
import { RealestatePageComponent } from './realestate-page/realestate-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'realestate/add', component: AddRealEstateComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'realestate/page/:id', component: RealestatePageComponent },

  {
    path: 'message',
    component: MessageComponent,
    children: [
      { path: 'massage-send', component: MessageSendComponent },
      { path: 'massage-inbox', component: MessageInboxComponent },
    ],
  },

  {
    path: 'admin',
    component: AdminPanelComponent,
    children: [
      { path: 'admin-users', component: AdminUsersComponent },
      { path: 'admin-categories', component: AdminCategoriesComponent },
      { path: 'admin-realestates', component: AdminRealEstatesComponent },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    children: [
      { path: 'user-profile-messages', component: UserMessagesComponent },
      { path: 'user-profile-realEstates', component: UserRealEstatesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
