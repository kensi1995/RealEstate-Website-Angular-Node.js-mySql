import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RealEstatesImg } from '../models/realEstateImg.clas';
import { UserImg } from '../models/User.class';

@Injectable({
  providedIn: 'root',
})
export class changeImagesService {
  constructor(private hettpClient: HttpClient) {}

  changeImage(userImg: UserImg) {
    const api = environment.serverUrl + '/user/changeImg';
    return this.hettpClient.put(api, userImg);
  }
  addRealEstateImg(realEstatesImg: RealEstatesImg) {
    const api = environment.serverUrl + '/realestate/addRealestateImg';
    return this.hettpClient.post(api, realEstatesImg);
  }
  getRealEstateImg(realEstateId: number) {
    const api =
      environment.serverUrl + '/realestate/getImg?realestateId=' + realEstateId;
    return this.hettpClient.get(api);
  }
}
