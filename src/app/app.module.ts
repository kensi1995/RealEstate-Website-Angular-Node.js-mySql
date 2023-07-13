import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminRealEstatesComponent } from './admin-real-estates/admin-real-estates.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { UserRealEstatesComponent } from './user-real-estates/user-real-estates.component';
import { AddRealEstateComponent } from './add-real-estate/add-real-estate.component';
import { MessageComponent } from './message/message.component';
import { MessageInboxComponent } from './message-inbox/message-inbox.component';
import { MessageSendComponent } from './message-send/message-send.component';
import { RealestateCardComponent } from './realestate-card/realestate-card.component';
import { RealestatePageComponent } from './realestate-page/realestate-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchComponent } from './search/search.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdminPanelComponent,
    AdminRealEstatesComponent,
    AdminCategoriesComponent,
    AdminUsersComponent,
    UserProfileComponent,
    UserMessagesComponent,
    UserRealEstatesComponent,
    AddRealEstateComponent,
    MessageComponent,
    MessageInboxComponent,
    MessageSendComponent,
    RealestateCardComponent,
    RealestatePageComponent,
    SidebarComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FontAwesomeModule,
    CarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
