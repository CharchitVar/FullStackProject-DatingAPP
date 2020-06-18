import { Component, OnInit, Input, OnChanges, ChangeDetectorRef, AfterContentChecked, DoCheck } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { UserService } from 'src/app/_service/user.service';
import { AuthServiceService } from 'src/app/_service/AuthService.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { error } from 'protractor';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.css']
})
export class MemberMessageComponent implements OnInit, AfterContentChecked, DoCheck {

  @Input() recipientId: number;
  messages: Message[];
  newMessage: any ={};
  constructor( private authService: AuthServiceService,private userService: UserService, private alertify:AlertifyService) { }

  ngOnInit() {
    this.loadMessage();
  }
  ngAfterContentChecked(){
    
  }
  ngDoCheck(){
    this.loadMessage();
  }

  loadMessage() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
    .pipe(
      tap(messages => {
        for(let i=0; i<messages.length; i++){
          if(messages[i].isRead === false && messages[i].recipientId === currentUserId){
            this.userService.markAsRead(currentUserId,messages[i].id);
          }
        }
      })
    )
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
    },()=>{
      this.loadMessage();
    })
  }

}
