import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.class';

@Injectable({
  providedIn: 'root',
})
export class GetAllUsersService {
  constructor(private httpClient: HttpClient) {}
  getUsers(user: User) {
    const api = environment.serverUrl + '/getAllUsers';

    return this.httpClient.get(api);
  }
}
