import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  registerUser(user: User) {
    const api = environment.serverUrl + '/user/register';
    return this.httpClient.post<String>(api, user);
  }
}
