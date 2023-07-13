import { Component, OnInit } from '@angular/core';
import { User } from '../models/User.class';
import { Realestate } from '../models/realState.class';
import { RealEstatesImg } from '../models/realEstateImg.clas';
import { AddRealestateService } from '../services/addRealestate.service';
import { changeImagesService } from '../services/changeImages.service';
import { GetAllRealestatesService } from '../services/getAllRealestates.service';

@Component({
  selector: 'app-user-real-estates',
  templateUrl: './user-real-estates.component.html',
  styleUrls: ['./user-real-estates.component.css'],
})
export class UserRealEstatesComponent implements OnInit {
  realestates: Realestate[] = [];
  realestate: Realestate = {} as Realestate;
  loggedUser: any;
  user: User = {} as User;
  change: boolean = false;
  realestateImgUrl: string = '';
  realEstatesImg: RealEstatesImg = {} as RealEstatesImg;
  constructor(
    private getAllRealestates: GetAllRealestatesService,
    private deleteRealestate: AddRealestateService,
    private addRealestateImg: changeImagesService
  ) {}

  ngOnInit(): void {
    this.fetchUserRealestate();
  }

  displayChangeImg() {
    this.change = true;
  }
  fetchUserRealestate() {
    this.loggedUser = localStorage.getItem('LoggedUser');
    this.user = JSON.parse(this.loggedUser);

    this.getAllRealestates
      .getUserRealestate(this.user.id)
      .subscribe((response: any) => {
        this.realestates = response;
        console.log('all user relaestates', response);
      });
  }

  saveRealestateImg(realestateId: number) {
    this.realEstatesImg.image = this.realestateImgUrl;
    this.realEstatesImg.id = realestateId;
    this.addRealestateImg
      .addRealEstateImg(this.realEstatesImg)
      .subscribe((response: any) => {
        console.log('Realestate image added');
      });
    this.change = false;
  }
  deleteUserRealesatte(realestateId: number) {
    this.deleteRealestate
      .deleteRealestate(realestateId)
      .subscribe((response) => {
        console.log('Realestate deleted');
        this.fetchUserRealestate();
      });
  }
}
