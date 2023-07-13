import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/User.class';
import { LoginService } from '../services/login.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedUser: any;
  user: User = {} as User;
  displayAdmin: boolean = false;
  onLoggedSubscription?: Subscription;
  faBars = faBars;

  searchQuery: string = '';
  constructor(
    private loginService: LoginService,
    private searchService: SearchService
  ) {}
  ngOnDestroy(): void {
    this.onLoggedSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.onLoggedSubscription = this.loginService.onUserLoggedIn.subscribe(
      () => {
        console.log('OnLogged in header');
        this.isUserLogged();
        this.adminRole();
      }
    );
    this.adminRole();
  }
  adminRole() {
    this.loggedUser = localStorage.getItem('LoggedUser');

    if (this.loggedUser) {
      this.user = JSON.parse(this.loggedUser);
      if (this.user.role === 'ADMIN_ROLE') {
        this.displayAdmin = true;
      }
    } else {
      this.displayAdmin = false;
    }
  }

  isUserLogged() {
    this.loggedUser = localStorage.getItem('LoggedUser');
    this.user = JSON.parse(this.loggedUser);
    return this.user;
  }
  userLogout() {
    localStorage.removeItem('LoggedUser');
    this.adminRole();
  }

  performSearch(): void {
    this.searchService.updateSearchQuery(this.searchQuery);
  }
}
