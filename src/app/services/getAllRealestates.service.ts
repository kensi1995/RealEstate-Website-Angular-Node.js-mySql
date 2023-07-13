import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Realestate } from '../models/realState.class';

@Injectable({
  providedIn: 'root',
})
export class GetAllRealestatesService {
  constructor(private httpClient: HttpClient) {}

  getRealestates(realestate: Realestate) {
    const api = environment.serverUrl + '/getAllRealestates';

    return this.httpClient.get(api);
  }

  getUserRealestate(userId: number) {
    const api = environment.serverUrl + '/getUserRealestate?userId' + userId;
    return this.httpClient.get(api);
  }

  getOneRealestate(realestateId: number) {
    const api =
      environment.serverUrl +
      '/getRealestatePaige?realestateid=' +
      realestateId;

    return this.httpClient.get(api);
  }
}
