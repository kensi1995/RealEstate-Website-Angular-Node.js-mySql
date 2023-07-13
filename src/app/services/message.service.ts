import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message.class';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private httpClient: HttpClient) {}

  sendMessage(message: Message) {
    const api = environment.serverUrl + '/message/send';
    return this.httpClient.post(api, message);
  }

  getMessage(toUser: number) {
    const api = environment.serverUrl + '/message/get?toUser=' + toUser;
    return this.httpClient.get(api);
  }

  deleteMessage(messageId: number) {
    const api =
      environment.serverUrl + '/message/delete?messageId=' + messageId;
    return this.httpClient.delete(api);
  }
}
