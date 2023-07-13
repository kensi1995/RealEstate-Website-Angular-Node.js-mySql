import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Message } from '../models/message.class';
import { User } from '../models/User.class';
import { GetAllUsersService } from '../services/getAllUsers.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message-send',
  templateUrl: './message-send.component.html',
  styleUrls: ['./message-send.component.css'],
})
export class MessageSendComponent implements OnInit {
  messageStr: Message = {} as Message;
  messageText: string = '';
  toUserText: string = '';
  loggedUser: any;
  user: User = {} as User;
  toUser: User = {} as User;

  constructor(
    private MessageService: MessageService,
    private getAllUsers: GetAllUsersService
  ) {}

  ngOnInit(): void {}

  getToUserId() {
    this.getAllUsers.getUsers(this.toUser).subscribe((response: any) => {
      console.log('All users from console', response);
      for (let toUser of response) {
        if (toUser.username === this.toUserText) {
          this.messageStr.toUserId = toUser.id;
          console.log(toUser);
        }
      }
    });
  }

  sendNewMessage() {
    this.loggedUser = localStorage.getItem('LoggedUser');
    this.user = JSON.parse(this.loggedUser);
    this.getToUserId();
    console.log('Message', this.messageStr);

    this.messageStr.messageTime = moment(new Date()).format(
      'YYYY-MM-DD HH:mm:ss'
    );
    this.messageStr.message = this.messageText;
    this.messageStr.fromUserId = this.user.id;

    this.MessageService.sendMessage(this.messageStr).subscribe((response) => {
      console.log('Poslano sa fronta msg', response);
      this.MessageService;
    });
  }
}
