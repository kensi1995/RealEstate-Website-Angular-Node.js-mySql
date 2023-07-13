import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.class';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  onUserLoggedIn: Subject<void> = new Subject<void>();
  constructor(private httpClient: HttpClient) {}

  loginUser(user: User) {
    const api = environment.serverUrl + '/user/login';
    return this.httpClient.post<User>(api, user);
  }
}
