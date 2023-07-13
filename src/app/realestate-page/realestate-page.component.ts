import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Realestate } from '../models/realState.class';
import { RealEstatesImg } from '../models/realEstateImg.clas';
import { Message, MessageUsers } from '../models/message.class';
import { changeImagesService } from '../services/changeImages.service';
import { GetAllRealestatesService } from '../services/getAllRealestates.service';
import { MessageService } from '../services/message.service';
import { User } from '../models/User.class';
import * as moment from 'moment';

@Component({
  selector: 'app-realestate-page',
  templateUrl: './realestate-page.component.html',
  styleUrls: ['./realestate-page.component.css'],
})
export class RealestatePageComponent implements OnInit {
  @Output() realestateIdNum!: number;
  realestate: Realestate = {} as Realestate;
  index: number = 0;
  @Output() realestateImages: RealEstatesImg[] = [];
  isUserLogged: boolean = false;
  massageUsers: MessageUsers = {} as MessageUsers;
  user: User = {} as User;
  message: Message = {} as Message;
  loggedUser: any;
  constructor(
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private getAllRealestatesService: GetAllRealestatesService,
    private getRealestateImgService: changeImagesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log('params', params);
      if (params['id']) {
        this.getRealestatePage(+params['id']);
      }
    });

    this.haveLoggedUser();
  }

  buyRealestate() {
    this.user = JSON.parse(this.loggedUser);
    if (this.user.id == this.realestate.user_id) return;
    this.message.fromUserId = this.user.id;
    this.message.toUserId = this.realestate.user_id;
    this.message.messageTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    this.message.message = `I like your realestate and I want to buy it`;
    this.messageService.sendMessage(this.message).subscribe((response) => {
      console.log('Response buy realestate', response);
    });
  }

  haveLoggedUser() {
    this.loggedUser = localStorage.getItem('LoggedUser');
    if (this.loggedUser) this.isUserLogged = true;
    else {
      this.isUserLogged = false;
    }
  }

  getRealestatePage(realestateId: number) {
    console.log('realestateIddd', realestateId);
    this.realestateIdNum = realestateId;
    this.getAllRealestatesService
      .getOneRealestate(realestateId)
      .subscribe((response: any) => {
        console.log('get one realesatte response', response);
        this.realestate = response && response.length > 0 ? response[0] : {};
        console.log(this.realestate);
        this.getRealestateImgs(realestateId);
      });
  }

  getRealestateImgs(realestateId: number) {
    this.getRealestateImgService
      .getRealEstateImg(realestateId)
      .subscribe((response: any) => {
        console.log('Slike od Nekretnina', response);
        this.realestateImages = response;
      });
  }
}
