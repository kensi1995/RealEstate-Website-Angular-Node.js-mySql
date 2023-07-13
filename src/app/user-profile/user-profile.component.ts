import { Component, OnInit } from '@angular/core';
import { User, UserImg } from '../models/User.class';

import { ToastrService } from 'ngx-toastr';
import { changeImagesService } from '../services/changeImages.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  loggedUser: any;
  user: User = {} as User;
  change: boolean = false;
  userImgUrl: UserImg = {} as UserImg;
  profileImgUrl: string = '';
  constructor(
    private changeImageService: changeImagesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem('LoggedUser');
    this.user = JSON.parse(this.loggedUser);
    console.log(this.user);
  }

  displayChangeImg() {
    this.change = true;
  }
  saveImageUrl() {
    this.userImgUrl.userId = this.user.id;
    this.userImgUrl.imgUrl = this.profileImgUrl;
    this.changeImageService
      .changeImage(this.userImgUrl)
      .subscribe((response) => {
        const newUser = { ...this.user, image: response };
        localStorage.setItem('LoggedUser', JSON.stringify(newUser));
        this.toastr.success('Profile image is changed');
      });
    this.change = true;
  }
}
