import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message.class';
import * as moment from 'moment';
import { User } from '../models/User.class';

@Component({
  selector: 'app-message-inbox',
  templateUrl: './message-inbox.component.html',
  styleUrls: ['./message-inbox.component.css'],
})
export class MessageInboxComponent implements OnInit {
  messages: Message[] = [];
  loggedUser: any;
  user: User = {} as User;
  message: Message = {} as Message;
  replayMessageText: string = '';
  replyToggle: boolean = false;
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.getMessages();
  }

  replyToggleBtn() {
    this.replyToggle = true;
  }
  getMessages() {
    this.loggedUser = localStorage.getItem('LoggedUser');
    this.user = JSON.parse(this.loggedUser);
    this.messageService.getMessage(this.user.id).subscribe((response: any) => {
      this.messages = response;
      console.log('Poruke', this.messages);
    });
  }
  deleteYourMessage(messageId: number) {
    this.messageService.deleteMessage(messageId).subscribe((response) => {
      console.log('Obrisana je poruka', response);
      this.getMessages();
    });
  }

  replyMessage(fromUserId: number, toUserId: number) {
    this.message.fromUserId = toUserId;
    this.message.toUserId = fromUserId;
    this.message.messageTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    this.messageService.sendMessage(this.message).subscribe((response) => {
      console.log('Odgovorio si na poruku ', response);
    });
    this.replyToggle = false;
  }
}
