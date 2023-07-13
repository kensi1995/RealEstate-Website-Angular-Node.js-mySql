import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User.class';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  loggedUser: any;
  user: User = {} as User;
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    this.loggedUser = localStorage.getItem('LoggedUser');
    this.user = JSON.parse(this.loggedUser);
    if (!this.loggedUser) return this.router.createUrlTree(['']);
    if (this.user.role === 'ADMIN_ROLE') return true;
    else {
      return this.router.createUrlTree(['']);
    }
  }
}
