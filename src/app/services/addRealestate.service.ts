import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Realestate } from '../models/realState.class';
@Injectable({
  providedIn: 'root',
})
export class AddRealestateService {
  constructor(private httpClient: HttpClient) {}

  addRealestate(realestate: Realestate) {
    const api = environment.serverUrl + '/realestate/add';
    return this.httpClient.post<Realestate>(api, realestate);
  }

  deleteRealestate(realestateId: number) {
    const api =
      environment.serverUrl + '/realestate/delete?realestateId=' + realestateId;
    return this.httpClient.delete(api);
  }
}
