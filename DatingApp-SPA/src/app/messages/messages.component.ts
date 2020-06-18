import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination, PaginatedResult } from '../_models/Pagination';
import { UserService } from '../_service/user.service';
import { AuthServiceService } from '../_service/AuthService.service';
import { AlertifyService } from '../_service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(private userService: UserService,private authService: AuthServiceService, 
    private router: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.router.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    })
  }

  loadMessages(){
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage,
      this.pagination.itemsPerPage, this.messageContainer ).subscribe((res: PaginatedResult<Message[]>)=>{
        this.messages = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  deleteMessage(id: number){
    this.alertify.confirm("Are you sure to delete the Message",()=>{
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(()=>{
        this.messages.splice(this.messages.findIndex(m => m.id == id), 1);
        this.alertify.success("Message Deleted Successfully")
      }, (error) =>{
        this.alertify.error("Error in deleting the message");
      })
    })
  }

  pageChanged(event : any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}
