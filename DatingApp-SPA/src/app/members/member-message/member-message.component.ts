import { Component, OnInit, Input, OnChanges, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { UserService } from 'src/app/_service/user.service';
import { AuthServiceService } from 'src/app/_service/AuthService.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { error } from 'protractor';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.css']
})
export class MemberMessageComponent implements OnInit, AfterContentChecked {

  @Input() recipientId: number;
  messages: Message[];
  newMessage: any ={};
  constructor(private userService: UserService, private authService: AuthServiceService, private alertify:AlertifyService) { }

  ngOnInit() {
    this.loadMessage();
  }
  ngAfterContentChecked(){
    
  }

  loadMessage() {
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
    .subscribe((messages)=>{
      this.messages = messages;
    }, error =>{
      this.alertify.error(error);
    })
  }

  sendMessage(){
    console.log(this.newMessage.content);
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
    .subscribe((message : Message)=>{
      this.messages.unshift(message);
      this.newMessage.content ='';
      //this.loadMessage();

    },error =>{
      this.alertify.error(error);
    })
  }

}
