import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.class';

@Injectable({
  providedIn: 'root',
})
export class BanUserService {
  constructor(private httpClient: HttpClient) {}
  banUser(user: User) {
    const api = environment.serverUrl + '/user/ban';

    return this.httpClient.put(api, user);
  }
}
